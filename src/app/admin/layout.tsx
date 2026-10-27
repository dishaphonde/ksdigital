import type { Metadata } from "next";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  DollarSign,
  Settings,
  LogOut,
  ExternalLink,
  Layers,
  Inbox,
} from "lucide-react";
import { verifySession } from "@/lib/auth";
import { logoutAction } from "@/app/actions/admin";

export const metadata: Metadata = {
  title: "Admin Panel | KS Digital",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  // If not logged in, render child directly (e.g. login page)
  if (!session) {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "CRM Leads", href: "/admin/leads", icon: Inbox },
    { label: "Team Members", href: "/admin/team", icon: Users },
    { label: "Services CMS", href: "/admin/services", icon: Briefcase },
    { label: "Pricing CMS", href: "/admin/pricing", icon: DollarSign },
    { label: "Site Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="admin-theme min-h-screen bg-[#09090E] text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0D0D14] border-r border-white/10 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-violet to-brand-blue flex items-center justify-center font-heading font-bold text-white text-sm">
              KS
            </div>
            <div>
              <h2 className="font-heading font-bold text-sm text-white">
                KS Digital CMS
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-blue/20 text-cyan-300 border border-brand-blue/30 uppercase font-bold tracking-wider inline-block">
                {session.role}
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors group"
                >
                  <Icon className="w-4 h-4 text-brand-blue group-hover:text-cyan-300 transition-colors" />
                  <span className="text-slate-200 group-hover:text-white transition-colors">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Admin Content View */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
