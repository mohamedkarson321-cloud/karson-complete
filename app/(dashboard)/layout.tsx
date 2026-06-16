"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  LayoutDashboard, FolderKanban, MessageSquare,
  CreditCard, Bell, Settings, LogOut, Menu, X,
  Shield, ChevronRight, User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CLIENT_NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare, badge: 4 },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell, badge: 3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const ADMIN_NAV = [
  { href: "/admin", label: "Admin Overview", icon: Shield, exact: true },
  { href: "/admin/users", label: "Users", icon: User },
  { href: "/admin/analytics", label: "Analytics", icon: LayoutDashboard },
  { href: "/admin/blog", label: "Blog", icon: MessageSquare },
  { href: "/admin/portfolio", label: "Portfolio", icon: FolderKanban },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function SidebarLink({
  href, label, icon: Icon, badge, exact,
}: {
  href: string; label: string; icon: React.ElementType;
  badge?: number; exact?: boolean;
}) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group",
        active
          ? "bg-blue-500/10 text-white border border-blue-500/20"
          : "text-white/50 hover:text-white hover:bg-white/5"
      )}
      aria-current={active ? "page" : undefined}
    >
      <Icon className={cn("w-4 h-4 shrink-0", active ? "text-blue-400" : "text-white/40 group-hover:text-white/70")} />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold">
          {badge}
        </span>
      )}
      {active && <ChevronRight className="w-3 h-3 text-blue-400/50" />}
    </Link>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  const isAdmin = pathname.startsWith("/admin");
  const navLinks = isAdmin ? ADMIN_NAV : CLIENT_NAV;
  const user = session?.user;

  const Sidebar = () => (
    <aside className="flex flex-col h-full bg-[#080808] border-r border-white/5 w-64">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/5">
        <div className="relative flex items-center justify-center w-8 h-8 shrink-0">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="relative z-10">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <span className="font-bold text-white text-sm">KARSON</span>
          <span className="block text-xs text-white/30">{isAdmin ? "Admin Portal" : "Client Portal"}</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" role="navigation" aria-label="Dashboard navigation">
        {navLinks.map((link) => (
          <SidebarLink key={link.href} {...link} />
        ))}

        {/* Switch between portals if admin */}
        {user?.role === "ADMIN" || user?.role === "SUPER_ADMIN" ? (
          <div className="pt-4 mt-4 border-t border-white/5">
            <Link
              href={isAdmin ? "/dashboard" : "/admin"}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/5 transition-all"
            >
              <Shield className="w-4 h-4" />
              {isAdmin ? "Client Portal" : "Admin Portal"}
            </Link>
          </div>
        ) : null}
      </nav>

      {/* User profile */}
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name || "User"}</p>
            <p className="text-xs text-white/35 truncate">{user?.email}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
            aria-label="Sign out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col fixed inset-y-0 left-0 z-30 w-64">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-64 z-50">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 h-14 flex items-center justify-between px-4 md:px-6 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-xs text-white/40">
              <span>Portal</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/70 capitalize">
                {pathname.split("/").filter(Boolean).pop() || "overview"}
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard/notifications">
              <button className="relative flex items-center justify-center w-9 h-9 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 border border-[#0A0A0A]" />
              </button>
            </Link>
            <Link href="/dashboard/settings">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white cursor-pointer">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1" role="main">
          {children}
        </main>
      </div>
    </div>
  );
}
