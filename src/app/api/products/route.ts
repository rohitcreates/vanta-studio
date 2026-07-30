import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");

  const products = await prisma.product.findMany({
    where: category ? { category } : undefined,
  });

  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();

  const {
    name,
    category,
    brand,
    price,
    image,
    description,
    sizes,
    colors,
    trending,
  } = body;

  if (
    !name ||
    !category ||
    !brand ||
    !price ||
    !image ||
    !description ||
    !sizes ||
    !colors
  ) {
    return NextResponse.json(
      { message: "All required fields are missing" },
      { status: 400 }
    );
  }

  const product = await prisma.product.create({
    data: {
      name,
      category,
      brand,
      price,
      image,
      description,
      sizes,
      colors,
      trending: trending ?? false,
    },
  });

  return NextResponse.json(
    {
      message: "Product created successfully",
      product,
    },
    {
      status: 201,
    }
  );
}