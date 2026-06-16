"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Users, FolderKanban, FileText, MessageSquare, TrendingUp, Eye, DollarSign, Activity } from "lucide-react";

const STATS = [
  { label: "Total Users", value: "248", change: "+12 this month", icon: Users, color: "blue" },
  { label: "Active Projects", value: "34", change: "8 due this week", icon: FolderKanban, color: "violet" },
  { label: "Blog Posts", value: "62", change: "3 drafts pending", icon: FileText, color: "blue" },
  { label: "Contact Requests", value: "18", change: "5 new today", icon: MessageSquare, color: "violet" },
  { label: "Monthly Revenue", value: "$184K", change: "+22% vs last month", icon: DollarSign, color: "blue" },
  { label: "Page Views", value: "94.2K", change: "+18% this week", icon: Eye, color: "violet" },
  { label: "Uptime", value: "99.99%", change: "Last 30 days", icon: Activity, color: "blue" },
  { label: "NPS Score", value: "72", change: "Based on 94 responses", icon: TrendingUp, color: "violet" },
];

const RECENT_USERS = [
  { name: "Sarah Chen", email: "sarah@nexatech.com", role: "CLIENT", joined: "2h ago", status: "ACTIVE" },
  { name: "Marcus Rodriguez", email: "marcus@financecore.com", role: "CLIENT", joined: "5h ago", status: "ACTIVE" },
  { name: "Priya Patel", email: "priya@healthsync.ai", role: "CLIENT", joined: "1d ago", status: "ACTIVE" },
  { name: "James Thornton", email: "james@logiflow.com", role: "CLIENT", joined: "2d ago", status: "PENDING_VERIFICATION" },
];

const RECENT_CONTACTS = [
  { name: "Alex Kim", company: "TechStartup Inc.", service: "AI Solutions", budget: "$50K+", status: "NEW" },
  { name: "Marie Dubois", company: "EuropeCorp", service: "Web Development", budget: "$25K", status: "IN_PROGRESS" },
  { name: "Raj Patel", company: "IndiaFintech", service: "Consulting", budget: "$15K", status: "RESPONDED" },
];

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "text-emerald-400 bg-emerald-400/10",
  PENDING_VERIFICATION: "text-amber-400 bg-amber-400/10",
  NEW: "text-blue-400 bg-blue-400/10",
  IN_PROGRESS: "text-violet-400 bg-violet-400/10",
  RESPONDED: "text-emerald-400 bg-emerald-400/10",
};

export default function AdminPage() {
  const { data: session } = useSession();

  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Admin Dashboard</h1>
        <p className="text-white/40 text-sm">Platform overview — {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          const isBlue = stat.color === "blue";
          return (
            <div key={stat.label} className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-white/40">{stat.label}</p>
                <div className={`p-1.5 rounded-lg ${isBlue ? "bg-blue-500/10 text-blue-400" : "bg-violet-500/10 text-violet-400"}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <p className="text-xl font-bold text-white mb-0.5">{stat.value}</p>
              <p className="text-xs text-white/30">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent users */}
        <div className="card-dark rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-white">Recent Users</h2>
            <a href="/admin/users" className="text-xs text-blue-400 hover:text-blue-300">View all</a>
          </div>
          <div className="space-y-3">
            {RECENT_USERS.map((user) => (
              <div key={user.email} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/3 transition-all">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {user.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.name}</p>
                  <p className="text-xs text-white/35 truncate">{user.email}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[user.status] || ""}`}>
                    {user.status === "PENDING_VERIFICATION" ? "Pending" : user.status.toLowerCase()}
                  </span>
                  <span className="text-xs text-white/25">{user.joined}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent contact requests */}
        <div className="card-dark rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-white">Contact Requests</h2>
            <a href="/admin/contacts" className="text-xs text-blue-400 hover:text-blue-300">View all</a>
          </div>
          <div className="space-y-3">
           {RECENT_CONTACTS.map((contact, index) => (
              <div key={index} className="p-4 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-white">{contact.name}</p>
                    <p className="text-xs text-white/40">{contact.company}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[contact.status] || ""}`}>
                    {contact.status.replace("_", " ").toLowerCase()}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/35">
                  <span>{contact.service}</span>
                  <span>·</span>
                  <span>{contact.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick admin actions */}
      <div className="card-dark rounded-2xl p-6">
        <h2 className="font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Create Blog Post", href: "/admin/blog/new", color: "blue" },
            { label: "Add Portfolio Project", href: "/admin/portfolio/new", color: "violet" },
            { label: "Manage Users", href: "/admin/users", color: "blue" },
            { label: "View Analytics", href: "/admin/analytics", color: "violet" },
          ].map((action) => (
            <a
              key={action.href}
              href={action.href}
              className={`flex items-center justify-center h-12 rounded-xl text-sm font-medium transition-all ${
                action.color === "blue"
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/15"
                  : "bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/15"
              }`}
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
