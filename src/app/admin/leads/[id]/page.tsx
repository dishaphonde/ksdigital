import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  MessageCircle,
  Building,
  Calendar,
  Send,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { updateLeadStatusAction, addLeadNoteAction } from "@/app/actions/admin";

interface LeadDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const session = await verifySession();
  if (!session) redirect("/admin");

  const { id } = await params;
  let lead = null;

  try {
    lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        notes: {
          orderBy: { createdAt: "desc" },
          include: { author: true },
        },
      },
    });
  } catch (err) {
    console.error("Failed to query lead:", err);
  }

  if (!lead) notFound();

  async function handleStatusChange(formData: FormData) {
    "use server";
    const status = formData.get("status") as any;
    await updateLeadStatusAction(id, status);
  }

  async function handleAddNote(formData: FormData) {
    "use server";
    const content = formData.get("content") as string;
    if (content?.trim()) {
      await addLeadNoteAction(id, content.trim());
    }
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/leads"
          className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            {lead.name}
          </h1>
          <p className="text-xs text-muted">
            Inquiry received on {new Date(lead.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Lead Info & Message */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                Pipeline Status
              </span>
              <form action={handleStatusChange} className="flex items-center gap-2">
                <select
                  name="status"
                  defaultValue={lead.status}
                  className="bg-[#14141F] border border-white/10 text-foreground text-xs font-semibold py-1.5 px-3 rounded-lg focus:outline-none focus:border-brand-blue"
                >
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="QUALIFIED">QUALIFIED</option>
                  <option value="PROPOSAL_SENT">PROPOSAL_SENT</option>
                  <option value="WON">WON</option>
                  <option value="LOST">LOST</option>
                </select>
                <button type="submit" className="btn-secondary text-xs py-1.5 px-3">
                  Update
                </button>
              </form>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-muted block mb-1">Email</span>
                <a
                  href={`mailto:${lead.email}`}
                  className="text-foreground font-semibold hover:text-brand-blue flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-blue" /> {lead.email}
                </a>
              </div>

              <div>
                <span className="text-muted block mb-1">Phone</span>
                {lead.phone ? (
                  <a
                    href={`tel:${lead.phone}`}
                    className="text-foreground font-semibold hover:text-brand-blue flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-blue" /> {lead.phone}
                  </a>
                ) : (
                  <span className="text-muted">Not provided</span>
                )}
              </div>

              <div>
                <span className="text-muted block mb-1">Company</span>
                <span className="text-foreground font-semibold flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-muted" /> {lead.company || "N/A"}
                </span>
              </div>

              <div>
                <span className="text-muted block mb-1">Service Interested</span>
                <span className="text-brand-blue font-semibold">
                  {lead.serviceInterest || "General Inquiry"}
                </span>
              </div>

              <div>
                <span className="text-muted block mb-1">Budget</span>
                <span className="text-foreground font-semibold">
                  {lead.budget || "N/A"}
                </span>
              </div>

              <div>
                <span className="text-muted block mb-1">Source Page</span>
                <span className="text-foreground">{lead.sourcePage || "/"}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <span className="text-xs uppercase tracking-wider text-muted font-semibold block mb-2">
                Inquiry Message
              </span>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {lead.message}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-white/5 flex flex-wrap gap-3">
              {lead.phone && (
                <>
                  <a
                    href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 mr-1 text-emerald-400" /> WhatsApp
                  </a>
                  <a href={`tel:${lead.phone}`} className="btn-secondary text-xs">
                    <Phone className="w-3.5 h-3.5 mr-1 text-brand-blue" /> Call
                  </a>
                </>
              )}
              <a href={`mailto:${lead.email}`} className="btn-secondary text-xs">
                <Mail className="w-3.5 h-3.5 mr-1 text-brand-violet" /> Reply Email
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Internal CRM Notes */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 space-y-6">
            <h3 className="font-heading text-lg font-bold text-foreground">
              Internal Activity & Notes
            </h3>

            <form action={handleAddNote} className="space-y-3">
              <textarea
                name="content"
                required
                rows={3}
                placeholder="Log a call note, proposal follow-up, or lead qualification details..."
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-foreground placeholder-muted/50 focus:outline-none focus:border-brand-blue text-xs resize-y"
              ></textarea>
              <button type="submit" className="btn-primary text-xs py-2 px-3 w-full">
                Add Note <Send className="w-3 h-3 ml-1" />
              </button>
            </form>

            <div className="pt-4 border-t border-white/5 space-y-3">
              {lead.notes.length === 0 ? (
                <p className="text-xs text-muted text-center py-4">
                  No internal notes recorded yet.
                </p>
              ) : (
                lead.notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px] text-muted">
                      <span>{note.author?.name || "Team Member"}</span>
                      <span>
                        {new Date(note.createdAt).toLocaleDateString()} at{" "}
                        {new Date(note.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-foreground leading-relaxed">{note.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
