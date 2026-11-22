import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/lib/validations/user";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const body = RegisterSchema.parse(await request.json());
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: body.email },
          { username: body.username },
        ],
      },
      select: { email: true, username: true },
    });

    if (existingUser) {
      const field =
        existingUser.email === body.email ? "Email" : "Username";

      return NextResponse.json(
        { message: `${field} already exists.` },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);

    const user = await prisma.user.create({
      data: {
        name: body.name,
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Invalid input", errors: error.issues },
        { status: 400 }
      );
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { message: "Email or username already exists." },
        { status: 409 }
      );
    }

    console.error("Registration failed:", error);

    return NextResponse.json(
      { message: "Unable to register account." },
      { status: 500 }
    );
  }
}
