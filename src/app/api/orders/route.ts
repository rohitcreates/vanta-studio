import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/server-auth";
import { OrderSchema } from "@/lib/validations/order";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Authentication required." },
        { status: 401 }
      );
    }

    const body = OrderSchema.parse(await request.json());
    const productIds = [...new Set(body.items.map((item) => item.productId))];

    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        { message: "One or more products could not be found." },
        { status: 400 }
      );
    }

    const productById = new Map(products.map((product) => [product.id, product]));

    const orderItems = body.items.map((item) => {
      const product = productById.get(item.productId);

      if (!product) {
        throw new Error("Product not found.");
      }

      return {
        productId: product.id,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        price: product.price,
      };
    });

    const total = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        paymentMethod: body.paymentMethod,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        city: body.city,
        state: body.state,
        postalCode: body.postalCode,
        total,
        items: { create: orderItems },
      },
      include: { items: true },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Invalid order data.", errors: error.issues },
        { status: 400 }
      );
    }

    console.error("Order creation failed:", error);

    return NextResponse.json(
      { message: "Unable to create order." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Authentication required." },
        { status: 401 }
      );
    }

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Order lookup failed:", error);

    return NextResponse.json(
      { message: "Unable to load orders." },
      { status: 500 }
    );
  }
}
