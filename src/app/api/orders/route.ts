import { prisma } from "@/lib/prisma";
import { OrderSchema } from "@/lib/validations/order";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = OrderSchema.parse(await request.json());

    let total = 0;

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: body.items.map((item) => item.productId),
        },
      },
    });

    const orderItems = body.items.map((item) => {
      const product = products.find(
        (p) => p.id === item.productId
      );

      if (!product) {
        throw new Error("Product not found.");
      }

      total += product.price * item.quantity;

      return {
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        price: product.price,
      };
    });

    const order = await prisma.order.create({
      data: {
        userId: body.userId,

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

        items: {
          create: orderItems,
        },
      },

      include: {
        items: true,
      },
    });

    return NextResponse.json(order, {
      status: 201,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Invalid order data.",
          errors: error.issues,
        },
        {
          status: 400,
        }
      );
    }

    console.error(error);

    return NextResponse.json(
      {
        message: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const userId = Number(searchParams.get("userId"));

    if (!userId) {
      return NextResponse.json(
        {
          message: "User ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const orders = await prisma.order.findMany({
      where: {
        userId,
      },

      include: {
        items: {
          include: {
            product: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}