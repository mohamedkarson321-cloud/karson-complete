import type { DefaultSession, DefaultUser } from "next-auth";
import type { UserRole } from "@prisma/client";

// ─── NextAuth type extensions ─────────────────────────────────────────────────

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
  }
}

// ─── API Response types ───────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
  details?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// ─── Common component props ───────────────────────────────────────────────────

export interface WithClassName {
  className?: string;
}

export interface WithChildren {
  children: React.ReactNode;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavLink {
  href: string;
  label: string;
  icon?: React.ElementType;
  badge?: number;
  external?: boolean;
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface DashboardProject {
  id: string;
  name: string;
  status: string;
  progress: number;
  dueDate: string | null;
}

export interface DashboardStats {
  activeProjects: number;
  unreadMessages: number;
  openInvoices: number;
  teamActivity: number;
}
