import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

// ─── Rate Limiting (in-memory, upgrade to Redis in production) ───────────────

const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(
  ip: string,
  limit: number = 100,
  windowMs: number = 60_000
): boolean {
  const now = Date.now();
  const key = ip;
  const entry = rateLimit.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimit.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count++;
  return true;
}

// ─── Protected Routes ─────────────────────────────────────────────────────────

const ADMIN_ROUTES = ["/admin"];
const DASHBOARD_ROUTES = ["/dashboard"];
const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];
const API_AUTH_ROUTES = ["/api/auth"];

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1"
  );
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = getClientIp(request);

  // ── Security headers ──────────────────────────────────────────────────────
  const response = NextResponse.next();

  response.headers.set("X-Request-ID", crypto.randomUUID());
  response.headers.set(
    "X-DNS-Prefetch-Control",
    "on"
  );

  // ── Rate limiting for API routes ──────────────────────────────────────────
  if (pathname.startsWith("/api/")) {
    const apiLimit = pathname.startsWith("/api/auth") ? 20 : 60;
    const allowed = checkRateLimit(`${ip}:${pathname}`, apiLimit, 60_000);

    if (!allowed) {
      return new NextResponse(
        JSON.stringify({
          error: "Too Many Requests",
          message: "Rate limit exceeded. Please try again later.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
            "X-RateLimit-Limit": apiLimit.toString(),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }
  }

  // ── Auth check ────────────────────────────────────────────────────────────
  const session = await auth();
  const isAuthenticated = !!session?.user;
  const userRole = session?.user?.role;

  // Redirect authenticated users away from auth pages
  if (
    isAuthenticated &&
    AUTH_ROUTES.some((route) => pathname.startsWith(route))
  ) {
    const redirectUrl =
      userRole === "ADMIN" || userRole === "SUPER_ADMIN"
        ? "/admin"
        : "/dashboard";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Protect dashboard routes
  if (
    DASHBOARD_ROUTES.some((route) => pathname.startsWith(route)) &&
    !isAuthenticated
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Protect admin routes with role check
  if (ADMIN_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const allowedAdminRoles = ["ADMIN", "SUPER_ADMIN", "MANAGER"];
    if (!userRole || !allowedAdminRoles.includes(userRole)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // ── CSRF protection for mutations ─────────────────────────────────────────
  if (
    request.method !== "GET" &&
    request.method !== "HEAD" &&
    pathname.startsWith("/api/") &&
    !API_AUTH_ROUTES.some((route) => pathname.startsWith(route))
  ) {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    if (origin && host && !origin.includes(host)) {
      return new NextResponse(
        JSON.stringify({ error: "Forbidden", message: "Invalid request origin" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2)$).*)",
  ],
};
