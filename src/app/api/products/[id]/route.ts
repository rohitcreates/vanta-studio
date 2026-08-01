import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ProductSchema } from "@/lib/validations/product";
import { ZodError } from "zod";
import { Prisma } from "@/generated/prisma/client";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
  ...product,
  sizes: product.sizes.split(","),
  colors: product.colors.split(","),
});
}



export async function PATCH(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const body = ProductSchema.parse(await request.json());

    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        ...body,
        sizes: body.sizes.join(","),
        colors: body.colors.join(","),
      },
    });

    return NextResponse.json(product);
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



export async function DELETE(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(
      {
        message: "Product deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError
    ) {
  
      if (error.code === "P2003") {
        return NextResponse.json(
          {
            message:
              "This product cannot be deleted because it is part of an existing order.",
          },
          {
            status: 400,
          }
        );
      }

  
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Product not found.",
          },
          {
            status: 404,
          }
        );
      }
    }

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