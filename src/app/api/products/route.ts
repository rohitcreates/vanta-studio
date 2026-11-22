import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/server-auth";
import { ProductSchema } from "@/lib/validations/product";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const products = await prisma.product.findMany({
    where: category ? { category } : undefined,
  });

  const formattedProducts = products.map((product) => ({
    ...product,
    sizes: product.sizes.split(","),
    colors: product.colors.split(","),
  }));

  return NextResponse.json(formattedProducts);
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Authentication required." },
        { status: 401 }
      );
    }

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Administrator access required." },
        { status: 403 }
      );
    }

    const body = ProductSchema.parse(await request.json());

    const product = await prisma.product.create({
      data: {
        ...body,
        sizes: body.sizes.join(","),
        colors: body.colors.join(","),
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Invalid product data", errors: error.issues },
        { status: 400 }
      );
    }

    console.error("Product creation failed:", error);

    return NextResponse.json(
      { message: "Unable to create product." },
      { status: 500 }
    );
  }
}
