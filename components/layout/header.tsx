"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import {
  Menu, X, ChevronDown, Zap, Globe, Smartphone, Cloud,
  BarChart2, Settings, Shield, MessageSquare, LogOut,
  User, LayoutDashboard, Sun, Moon, Bell, ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const NAV_LINKS = [
  {
    label: "Services",
    href: "/services",
    submenu: [
      { label: "AI Solutions", href: "/services#ai", icon: Zap, desc: "Custom AI models & automation" },
      { label: "Web Development", href: "/services#web", icon: Globe, desc: "Full-stack enterprise apps" },
      { label: "Mobile Apps", href: "/services#mobile", icon: Smartphone, desc: "iOS & Android native apps" },
      { label: "Cloud Solutions", href: "/services#cloud", icon: Cloud, desc: "Scalable cloud architecture" },
      { label: "Data Analytics", href: "/services#data", icon: BarChart2, desc: "Insights from your data" },
      { label: "Automation", href: "/services#automation", icon: Settings, desc: "Streamline workflows" },
      { label: "Cybersecurity", href: "/services#security", icon: Shield, desc: "Protect your business" },
      { label: "Consulting", href: "/services#consulting", icon: MessageSquare, desc: "Strategic tech advisory" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Careers", href: "/careers" },
];

export function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(10,10,10,0)", "rgba(10,10,10,0.95)"]
  );
  const headerBorder = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.06)"]
  );

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        style={{ backgroundColor: headerBg, borderBottomColor: headerBorder }}
        className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
        role="banner"
      >
        <div className="container-wide">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
              aria-label="KARSON Home"
            >
              <div className="relative flex items-center justify-center w-8 h-8">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600" />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="relative z-10">
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                KARSON
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav
              ref={dropdownRef}
              className="hidden lg:flex items-center gap-1"
              role="navigation"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) =>
                link.submenu ? (
                  <div key={link.label} className="relative">
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === link.label ? null : link.label
                        )
                      }
                      className={cn(
                        "flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium",
                        "transition-all duration-150",
                        activeDropdown === link.label || isActive(link.href)
                          ? "text-white bg-white/5"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                      aria-expanded={activeDropdown === link.label}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          activeDropdown === link.label && "rotate-180"
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] p-3 rounded-2xl glass z-50"
                          role="menu"
                        >
                          <div className="grid grid-cols-2 gap-1">
                            {link.submenu.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                role="menuitem"
                              >
                                <div className="mt-0.5 p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                                  <item.icon className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                                    {item.label}
                                  </p>
                                  <p className="text-xs text-white/40 mt-0.5">
                                    {item.desc}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-2 pt-2 border-t border-white/5">
                            <Link
                              href="/services"
                              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all"
                            >
                              <span>View all services</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                      isActive(link.href)
                        ? "text-white bg-white/5"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>
              )}

              {session?.user ? (
                <div className="hidden lg:flex items-center gap-2">
                  <Link href="/dashboard/notifications">
                    <button className="flex items-center justify-center w-9 h-9 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all relative">
                      <Bell className="w-4 h-4" />
                      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
                    </button>
                  </Link>
                  <div className="relative group">
                    <button className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/5 transition-all">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white">
                        {session.user.name?.[0]?.toUpperCase() || "U"}
                      </div>
                      <span className="text-sm text-white/70 max-w-[100px] truncate">
                        {session.user.name}
                      </span>
                      <ChevronDown className="w-3 h-3 text-white/40" />
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-52 p-1.5 rounded-2xl glass z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <div className="my-1 h-px bg-white/5" />
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="sm">
                      Get started
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed inset-0 z-40 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-[#0A0A0A] border-l border-white/5 overflow-y-auto">
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <span className="font-bold text-white">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-4 space-y-1">
                {NAV_LINKS.map((link) =>
                  link.submenu ? (
                    <div key={link.label}>
                      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white/30">
                        {link.label}
                      </p>
                      {link.submenu.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <item.icon className="w-4 h-4 text-blue-400" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                        isActive(link.href)
                          ? "text-white bg-blue-500/10"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>
              <div className="p-4 border-t border-white/5 space-y-2">
                {session?.user ? (
                  <>
                    <Link href="/dashboard">
                      <Button variant="secondary" className="w-full">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full text-red-400/70 hover:text-red-400"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="secondary" className="w-full">Sign in</Button>
                    </Link>
                    <Link href="/contact">
                      <Button className="w-full">Get started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
