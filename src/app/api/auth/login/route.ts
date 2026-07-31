import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/validations/login";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    // Validate request body
    const body = LoginSchema.parse(await request.json());

    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    // User not found
    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(
      body.password,
      user.password
    );

    // Wrong password
    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    // Login successful
    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Invalid input",
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