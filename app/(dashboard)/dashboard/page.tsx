"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  FolderKanban, MessageSquare, CreditCard, Bell,
  TrendingUp, Clock, CheckCircle2, ArrowRight,
  Activity, Zap, BarChart3,
} from "lucide-react";

const MOCK_PROJECTS = [
  { id: "1", name: "AI Fraud Detection", status: "IN_PROGRESS", progress: 68, dueDate: "Jan 15, 2025", color: "blue" },
  { id: "2", name: "Mobile App Redesign", status: "REVIEW", progress: 90, dueDate: "Dec 28, 2024", color: "violet" },
  { id: "3", name: "Data Pipeline", status: "PLANNING", progress: 15, dueDate: "Feb 5, 2025", color: "blue" },
];

const MOCK_NOTIFICATIONS = [
  { id: "1", text: "Milestone 3 completed on AI Fraud Detection", time: "2h ago", type: "success" },
  { id: "2", text: "New message from your project manager", time: "5h ago", type: "message" },
  { id: "3", text: "Invoice #INV-2024-089 is ready", time: "1d ago", type: "billing" },
];

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  PLANNING: { label: "Planning", color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
  IN_PROGRESS: { label: "In Progress", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  REVIEW: { label: "In Review", color: "text-violet-400 bg-violet-400/10 border-violet-400/20" },
  COMPLETED: { label: "Completed", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] || "there";

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
          {greeting}, {firstName} 👋
        </h1>
        <p className="text-white/50 text-sm">
          Here&apos;s what&apos;s happening with your projects.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Projects", value: "3", icon: FolderKanban, color: "blue", change: "+1 this month" },
          { label: "Unread Messages", value: "4", icon: MessageSquare, color: "violet", change: "2 urgent" },
          { label: "Open Invoices", value: "$12,400", icon: CreditCard, color: "blue", change: "Due Jan 1" },
          { label: "Team Activity", value: "94%", icon: Activity, color: "violet", change: "This week" },
        ].map((stat) => {
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
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-white/30">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Projects */}
        <div className="lg:col-span-2 card-dark rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-white">Active Projects</h2>
            <Link href="/dashboard/projects" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-4">
            {MOCK_PROJECTS.map((project) => {
              const status = STATUS_CONFIG[project.status]!;
              const isBlue = project.color === "blue";
              return (
                <div key={project.id} className="p-4 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-white text-sm mb-1">{project.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs border ${status.color}`}>{status.label}</span>
                        <span className="flex items-center gap-1 text-xs text-white/35">
                          <Clock className="w-3 h-3" /> Due {project.dueDate}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-white">{project.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${isBlue ? "bg-gradient-to-r from-blue-500 to-blue-400" : "bg-gradient-to-r from-violet-500 to-violet-400"}`}
                      style={{ width: `${project.progress}%` }}
                      role="progressbar"
                      aria-valuenow={project.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notifications */}
        <div className="card-dark rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-white">Notifications</h2>
            <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">
              {MOCK_NOTIFICATIONS.length}
            </span>
          </div>
          <div className="space-y-3">
            {MOCK_NOTIFICATIONS.map((n) => (
              <div key={n.id} className="flex gap-3 p-3 rounded-xl hover:bg-white/3 transition-all cursor-pointer">
                <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${
                  n.type === "success" ? "bg-emerald-500/10 text-emerald-400" :
                  n.type === "message" ? "bg-blue-500/10 text-blue-400" :
                  "bg-amber-500/10 text-amber-400"
                }`}>
                  {n.type === "success" ? <CheckCircle2 className="w-3 h-3" /> :
                   n.type === "message" ? <MessageSquare className="w-3 h-3" /> :
                   <CreditCard className="w-3 h-3" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/70 leading-snug">{n.text}</p>
                  <p className="text-xs text-white/30 mt-1">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/dashboard/notifications" className="block mt-4 text-center text-xs text-white/30 hover:text-white/50 transition-colors">
            View all notifications
          </Link>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "View Projects", href: "/dashboard/projects", icon: FolderKanban },
          { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
          { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
          { label: "Settings", href: "/dashboard/settings", icon: Zap },
        ].map(({ label, href, icon: Icon }) => (
          <Link key={href} href={href} className="glass rounded-xl p-4 flex flex-col items-center gap-2 hover:border-white/15 transition-all group text-center">
            <Icon className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs text-white/60 group-hover:text-white transition-colors">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
