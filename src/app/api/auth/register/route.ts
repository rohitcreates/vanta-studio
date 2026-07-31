import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/lib/validations/user";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = RegisterSchema.parse(await request.json());
    const existingUser = await prisma.user.findUnique({
  where: {
    email: body.email,
  },
});

if (existingUser) {
  return NextResponse.json(
    {
      message: "Email already exists",
    },
    {
      status: 409,
    }
  );
}
const hashedPassword = await bcrypt.hash(
  body.password,
  10
);

const user = await prisma.user.create({
  data: {
    name: body.name,
    username: body.username,
    email: body.email,
    password: hashedPassword,
  },
});

return NextResponse.json(
  {
    message: "User registered successfully",
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  },
  {
    status: 201,
  }
);
  }

  catch (error) {
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
  };
}
