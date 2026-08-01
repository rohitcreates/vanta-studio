import { prisma } from "@/lib/prisma";
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
    const body = ProductSchema.parse(await request.json());

    const product = await prisma.product.create({
      data: {
        ...body,
        sizes: body.sizes.join(","),
        colors: body.colors.join(","),
      },
    });

    return NextResponse.json(product, {
      status: 201,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Invalid product data",
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
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}