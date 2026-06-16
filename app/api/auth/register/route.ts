import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations/auth";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = await registerSchema.parseAsync(body);

    // Check for existing user
    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: "CLIENT",
        status: "ACTIVE",
      },
      select: { id: true, name: true, email: true, role: true },
    });

    return NextResponse.json(
      { message: "Account created successfully.", user },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input.", details: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    console.error("[REGISTER]", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
