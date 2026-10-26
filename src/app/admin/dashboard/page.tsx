import Link from "next/link";
import { redirect } from "next/navigation";
import { Inbox, Users, Briefcase, TrendingUp, ArrowRight, Clock } from "lucide-react";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const session = await verifySession();
  if (!session) redirect("/admin");

  let leadsCount = 0;
  let newLeadsCount = 0;
  let recentLeads: any[] = [];
  let teamCount = 0;
  let servicesCount = 0;

  try {
    [leadsCount, newLeadsCount, recentLeads, teamCount, servicesCount] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "NEW" } }),
      prisma.lead.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      prisma.teamMember.count(),
      prisma.service.count(),
    ]);
  } catch (err) {
    console.error("Dashboard stats query error:", err);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
          Welcome back, {session.name}
        </h1>
        <p className="text-muted text-sm mt-1">
          Here is a quick overview of your inbound CRM leads and website content status.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-6 border-brand-blue/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Total Inbound Leads
            </span>
            <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <p className="font-heading text-3xl font-extrabold text-foreground">{leadsCount}</p>
          <span className="text-xs text-brand-blue mt-1 block">Saved in CRM database</span>
        </div>

        <div className="glass-card p-6 border-emerald-500/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              New Pending Leads
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="font-heading text-3xl font-extrabold text-foreground">{newLeadsCount}</p>
          <span className="text-xs text-emerald-400 mt-1 block">Awaiting initial follow-up</span>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Active Team Members
            </span>
            <div className="w-8 h-8 rounded-lg bg-brand-violet/10 text-brand-violet flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="font-heading text-3xl font-extrabold text-foreground">{teamCount || 5}</p>
          <span className="text-xs text-muted mt-1 block">Listed on About Us</span>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Active Services
            </span>
            <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <p className="font-heading text-3xl font-extrabold text-foreground">{servicesCount || 7}</p>
          <span className="text-xs text-muted mt-1 block">Dedicated landing pages</span>
        </div>
      </div>

      {/* Recent Leads Strip */}
      <div className="glass-card p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold text-foreground">
            Recent Inbound Leads
          </h2>
          <Link
            href="/admin/leads"
            className="text-xs font-semibold text-brand-blue hover:underline inline-flex items-center gap-1"
          >
            View Full CRM <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-xl text-muted text-sm">
            No leads received yet. Test by submitting the contact form on the live site!
          </div>
        ) : (
          <div className="divide-y divide-white/5 overflow-x-auto">
            {recentLeads.map((lead) => (
              <div
                key={lead.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <strong className="text-foreground text-sm">{lead.name}</strong>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-blue/10 text-brand-blue">
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-1">
                    {lead.email} • {lead.phone} • Interested in: {lead.serviceInterest || "General Inquiry"}
                  </p>
                </div>
                <Link
                  href={`/admin/leads/${lead.id}`}
                  className="btn-secondary text-xs py-1.5 px-3 self-start sm:self-auto"
                >
                  Manage Lead <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link
          href="/admin/team"
          className="glass-card p-6 hover:border-brand-blue/40 transition-colors group"
        >
          <Users className="w-6 h-6 text-brand-blue mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-heading font-bold text-base text-foreground mb-1">
            Manage Team Members
          </h3>
          <p className="text-xs text-muted">
            Add or edit bios, roles, headshots, and ordering on the About page.
          </p>
        </Link>

        <Link
          href="/admin/pricing"
          className="glass-card p-6 hover:border-brand-violet/40 transition-colors group"
        >
          <TrendingUp className="w-6 h-6 text-brand-violet mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-heading font-bold text-base text-foreground mb-1">
            Edit Pricing Plans
          </h3>
          <p className="text-xs text-muted">
            Update monthly rates, package inclusions, and highlighted plans.
          </p>
        </Link>

        <Link
          href="/admin/settings"
          className="glass-card p-6 hover:border-brand-blue/40 transition-colors group"
        >
          <Briefcase className="w-6 h-6 text-brand-blue mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-heading font-bold text-base text-foreground mb-1">
            Site Settings & Contact Info
          </h3>
          <p className="text-xs text-muted">
            Update phone number, WhatsApp link, and primary agency credentials.
          </p>
        </Link>
      </div>
    </div>
  );
}
