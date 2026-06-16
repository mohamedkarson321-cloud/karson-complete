import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validations/auth";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = await newsletterSchema.parseAsync(body);

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
      select: { id: true, status: true },
    });

    if (existing) {
      if (existing.status === "ACTIVE") {
        return NextResponse.json(
          { message: "You're already subscribed!" },
          { status: 200 }
        );
      }
      await prisma.newsletterSubscriber.update({
        where: { email },
        data: { status: "ACTIVE", name, unsubscribedAt: null },
      });
      return NextResponse.json({ message: "Welcome back! You're now subscribed." });
    }

    await prisma.newsletterSubscriber.create({
      data: {
        email,
        name,
        status: "ACTIVE",
        confirmedAt: new Date(),
        source: request.headers.get("referer") || "direct",
      },
    });

    return NextResponse.json(
      { message: "You're subscribed! Expect great content soon." },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    console.error("[SUBSCRIBE]", error);
    return NextResponse.json({ error: "Subscription failed." }, { status: 500 });
  }
}
