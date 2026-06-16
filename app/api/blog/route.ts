import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { blogPostSchema } from "@/lib/validations/auth";
import { z } from "zod";
import { slugify, estimateReadingTime } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured") === "true";

    const session = await auth();
    const isEditor = ["ADMIN", "SUPER_ADMIN", "EDITOR", "MANAGER"].includes(session?.user?.role || "");

    const where = {
      ...(isEditor ? {} : { status: "PUBLISHED" as const }),
      ...(category ? { category: { slug: category } } : {}),
      ...(tag ? { tags: { has: tag } } : {}),
      ...(featured ? { isFeatured: true } : {}),
      ...(search ? {
        OR: [
          { title: { contains: search, mode: "insensitive" as const } },
          { excerpt: { contains: search, mode: "insensitive" as const } },
          { tags: { has: search } },
        ],
      } : {}),
      deletedAt: null,
    };

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        select: {
          id: true, title: true, slug: true, excerpt: true,
          featuredImage: true, tags: true, readingTime: true,
          viewCount: true, publishedAt: true, status: true,
          isFeatured: true,
          author: { select: { id: true, name: true, image: true } },
          category: { select: { id: true, name: true, slug: true, color: true } },
        },
        orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("[BLOG GET]", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id || !["ADMIN", "SUPER_ADMIN", "EDITOR"].includes(session.user.role || "")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = await blogPostSchema.parseAsync(body);

    const slug = data.slug || slugify(data.title);

    // Check slug uniqueness
    const existing = await prisma.blogPost.findUnique({ where: { slug }, select: { id: true } });
    if (existing) {
      return NextResponse.json({ error: "A post with this slug already exists." }, { status: 409 });
    }

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        authorId: session.user.id,
        categoryId: data.categoryId || null,
        tags: data.tags,
        featuredImage: data.featuredImage || null,
        status: data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
        readingTime: estimateReadingTime(data.content),
        publishedAt: data.status === "PUBLISHED" ? new Date() : null,
        seoTitle: data.seoTitle || data.title,
        seoDescription: data.seoDescription || data.excerpt,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.flatten().fieldErrors }, { status: 400 });
    }
    console.error("[BLOG POST]", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
