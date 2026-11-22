import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/server-auth";
import { NextResponse } from "next/server";
import { ProductSchema } from "@/lib/validations/product";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

type RouteParams = {
  params: Promise<{ id: string }>;
};

async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        { message: "Authentication required." },
        { status: 401 }
      ),
    };
  }

  if (user.role !== "ADMIN") {
    return {
      user: null,
      response: NextResponse.json(
        { message: "Administrator access required." },
        { status: 403 }
      ),
    };
  }

  return { user, response: null };
}

export async function GET(
  _request: Request,
  { params }: RouteParams
) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId < 1) {
    return NextResponse.json(
      { message: "Invalid product ID." },
      { status: 400 }
    );
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return NextResponse.json(
      { message: "Product not found." },
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
    const access = await requireAdmin();

    if (access.response) {
      return access.response;
    }

    const { id } = await params;
    const productId = Number(id);

    if (!Number.isInteger(productId) || productId < 1) {
      return NextResponse.json(
        { message: "Invalid product ID." },
        { status: 400 }
      );
    }

    const body = ProductSchema.parse(await request.json());

    const product = await prisma.product.update({
      where: { id: productId },
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
        { message: "Invalid product data", errors: error.issues },
        { status: 400 }
      );
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "Product not found." },
        { status: 404 }
      );
    }

    console.error("Product update failed:", error);

    return NextResponse.json(
      { message: "Unable to update product." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: RouteParams
) {
  try {
    const access = await requireAdmin();

    if (access.response) {
      return access.response;
    }

    const { id } = await params;
    const productId = Number(id);

    if (!Number.isInteger(productId) || productId < 1) {
      return NextResponse.json(
        { message: "Invalid product ID." },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json(
      { message: "Product deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        return NextResponse.json(
          {
            message:
              "This product cannot be deleted because it is part of an existing order.",
          },
          { status: 409 }
        );
      }

      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Product not found." },
          { status: 404 }
        );
      }
    }

    console.error("Product deletion failed:", error);

    return NextResponse.json(
      { message: "Unable to delete product." },
      { status: 500 }
    );
  }
}
