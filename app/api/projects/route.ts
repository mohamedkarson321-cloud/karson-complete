import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { projectSchema } from "@/lib/validations/auth";
import { slugify } from "@/lib/utils";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const isAdmin = ["ADMIN", "SUPER_ADMIN", "MANAGER"].includes(session.user.role || "");
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");

    const where = {
      ...(isAdmin ? {} : { clientId: session.user.id }),
      ...(status ? { status: status as "PLANNING" | "IN_PROGRESS" | "REVIEW" | "ON_HOLD" | "COMPLETED" | "CANCELLED" | "ARCHIVED" } : {}),
      deletedAt: null,
    };

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        select: {
          id: true, name: true, slug: true, description: true,
          status: true, priority: true, progress: true,
          startDate: true, endDate: true, thumbnailUrl: true,
          technologies: true, isFeatured: true, createdAt: true,
          client: { select: { id: true, name: true, email: true, image: true } },
          service: { select: { id: true, name: true, category: true } },
          _count: { select: { milestones: true, tasks: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.project.count({ where }),
    ]);

    return NextResponse.json({
      projects,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("[PROJECTS GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!["ADMIN", "SUPER_ADMIN", "MANAGER"].includes(session?.user?.role || "")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const data = await projectSchema.parseAsync(body);

    const slug = slugify(data.name) + "-" + Date.now().toString(36);

    const project = await prisma.project.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
        serviceId: data.serviceId || null,
        budget: data.budget || null,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        technologies: data.technologies,
        status: data.status as "PLANNING" | "IN_PROGRESS" | "REVIEW" | "ON_HOLD" | "COMPLETED" | "CANCELLED",
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.flatten().fieldErrors }, { status: 400 });
    }
    console.error("[PROJECTS POST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
