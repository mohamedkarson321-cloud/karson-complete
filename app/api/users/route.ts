import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!["ADMIN", "SUPER_ADMIN"].includes(session?.user?.role || "")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search");
    const role = searchParams.get("role");
    const status = searchParams.get("status");

    const where = {
      deletedAt: null,
      ...(search ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
          { company: { contains: search, mode: "insensitive" as const } },
        ],
      } : {}),
      ...(role ? { role: role as "ADMIN" | "CLIENT" | "GUEST" | "MANAGER" | "EDITOR" | "SUPER_ADMIN" } : {}),
      ...(status ? { status: status as "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING_VERIFICATION" | "DELETED" } : {}),
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true, name: true, email: true, image: true,
          role: true, status: true, company: true,
          lastLoginAt: true, loginCount: true, createdAt: true,
          _count: { select: { projects: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({
      users,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("[USERS GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!["ADMIN", "SUPER_ADMIN"].includes(session?.user?.role || "")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { userId, role, status } = body;

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    // Prevent changing own role
    if (userId === session?.user?.id) {
      return NextResponse.json({ error: "Cannot modify your own role or status" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(role && { role }),
        ...(status && { status }),
      },
      select: { id: true, name: true, email: true, role: true, status: true },
    });

    // Log activity
    await prisma.userActivity.create({
      data: {
        userId: session!.user!.id!,
        type: "ADMIN",
        action: "UPDATE_USER",
        resource: "user",
        resourceId: userId,
        metadata: { changes: { role, status } },
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("[USERS PATCH]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
