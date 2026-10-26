import Link from "next/link";
import { redirect } from "next/navigation";
import { Download, ArrowRight, Eye, Phone, Mail, Clock } from "lucide-react";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";

export default async function AdminLeadsPage() {
  const session = await verifySession();
  if (!session) redirect("/admin");

  let leads: any[] = [];
  try {
    leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Failed to query leads:", err);
  }

  const statusColors: Record<string, string> = {
    NEW: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    CONTACTED: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    QUALIFIED: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    PROPOSAL_SENT: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    WON: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    LOST: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            Inbound CRM Leads ({leads.length})
          </h1>
          <p className="text-muted text-sm mt-1">
            Track inquiries, update sales pipeline status, and maintain client follow-up notes.
          </p>
        </div>

        {/* Export CSV action */}
        <a
          href="/api/leads/export"
          download="ks-digital-leads.csv"
          className="btn-secondary text-xs py-2 px-3 self-start sm:self-auto inline-flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" /> Export Leads CSV
        </a>
      </div>

      {leads.length === 0 ? (
        <div className="glass-card p-12 text-center text-muted space-y-3">
          <p className="text-base font-medium text-foreground">No leads in the database yet.</p>
          <p className="text-xs">
            Submit a test inquiry via the public website contact form to see it appear here instantly!
          </p>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.02] border-b border-white/5 text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="py-4 px-6 font-semibold">Contact</th>
                  <th className="py-4 px-6 font-semibold">Service / Budget</th>
                  <th className="py-4 px-6 font-semibold">Status</th>
                  <th className="py-4 px-6 font-semibold">Source</th>
                  <th className="py-4 px-6 font-semibold">Date</th>
                  <th className="py-4 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-medium text-foreground">{lead.name}</div>
                      <div className="text-xs text-muted flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {lead.email}</span>
                        {lead.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {lead.phone}</span>}
                      </div>
                      {lead.company && (
                        <span className="text-[11px] text-muted-foreground block mt-0.5">
                          Company: {lead.company}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <span className="text-xs font-semibold text-brand-blue block">
                        {lead.serviceInterest || "General"}
                      </span>
                      {lead.budget && (
                        <span className="text-[11px] text-muted">Budget: {lead.budget}</span>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider ${
                          statusColors[lead.status] || "bg-white/5 text-muted border-white/10"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-xs text-muted">
                      <span>{lead.sourcePage || "/"}</span>
                      {lead.utmSource && (
                        <span className="text-[10px] text-brand-blue block">
                          UTM: {lead.utmSource}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-xs text-muted">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="btn-secondary text-xs py-1 px-3 inline-flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" /> Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
