import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/auth";
import { auth } from "@/lib/auth";
import { z } from "zod";

// Simple in-memory rate limiter per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 5) return false; // Max 5 contact submissions per minute per IP
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "127.0.0.1";

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const data = await contactSchema.parseAsync(body);

    // Get current user if logged in
    const session = await auth();

    // Save to database
    const contactRequest = await prisma.contactRequest.create({
      data: {
        userId: session?.user?.id ?? null,
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        company: data.company ?? null,
        subject: data.subject,
        message: data.message,
        service: data.service ?? null,
        budget: data.budget ?? null,
        timeline: data.timeline ?? null,
        ipAddress: ip,
        userAgent: request.headers.get("user-agent") ?? null,
        status: "NEW",
        priority: data.budget?.includes("100") ? "HIGH" : "NORMAL",
      },
    });

    // TODO: Send email notification via Resend/Nodemailer
    // await sendContactNotificationEmail(data);

    return NextResponse.json(
      {
        message: "Message sent successfully. We'll be in touch within 24 hours.",
        id: contactRequest.id,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data.", details: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    console.error("[CONTACT]", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email us directly." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.role || !["ADMIN", "SUPER_ADMIN", "MANAGER"].includes(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status");

    const where = status ? { status: status as "NEW" | "READ" | "IN_PROGRESS" | "RESPONDED" | "CLOSED" | "SPAM" } : {};

    const [contacts, total] = await Promise.all([
      prisma.contactRequest.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.contactRequest.count({ where }),
    ]);

    return NextResponse.json({
      contacts,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("[CONTACT GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
