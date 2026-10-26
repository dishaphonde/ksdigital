import { redirect } from "next/navigation";
import { Plus, Trash2, Edit2, CheckCircle2, Eye, EyeOff, Save } from "lucide-react";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { saveTeamMemberAction, deleteTeamMemberAction } from "@/app/actions/admin";
import { fallbackTeamMembers } from "@/lib/data";

export default async function AdminTeamPage() {
  const session = await verifySession();
  if (!session) redirect("/admin");

  let members: any[] = [];
  try {
    members = await prisma.teamMember.findMany({
      orderBy: { order: "asc" },
    });
  } catch (err) {
    console.error("Team query error:", err);
  }

  if (members.length === 0) {
    members = fallbackTeamMembers;
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
          Team Members CMS
        </h1>
        <p className="text-muted text-sm mt-1">
          Manage profiles shown in the &quot;Meet Our Expertise&quot; section on the About page and Home preview. Changes go live immediately.
        </p>
      </div>

      {/* Add New Team Member Form */}
      <div className="glass-card p-6 sm:p-8 space-y-6 border-brand-blue/30">
        <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
          <Plus className="w-5 h-5 text-brand-blue" /> Add or Update Team Member
        </h2>

        <form action={saveTeamMemberAction} className="space-y-4">
          <input type="hidden" name="id" value="new" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Ketan Sawant"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-foreground text-sm focus:outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                Job Title / Role *
              </label>
              <input
                type="text"
                name="role"
                required
                placeholder="e.g. Founder"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-foreground text-sm focus:outline-none focus:border-brand-blue"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                Initials (for avatar)
              </label>
              <input
                type="text"
                name="initials"
                maxLength={3}
                placeholder="KS"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-foreground text-sm focus:outline-none focus:border-brand-blue uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                Headshot Photo URL
              </label>
              <input
                type="text"
                name="photo"
                placeholder="/team/ketan-sawant.jpg"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-foreground text-sm focus:outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                name="linkedinUrl"
                placeholder="https://linkedin.com/in/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-foreground text-sm focus:outline-none focus:border-brand-blue"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
              Full Biography Narrative *
            </label>
            <textarea
              name="bio"
              required
              rows={4}
              placeholder="Paste the member's complete professional bio here..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-foreground text-sm focus:outline-none focus:border-brand-blue resize-y"
            ></textarea>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-muted hover:text-foreground">
                <input
                  type="checkbox"
                  name="visible"
                  value="true"
                  defaultChecked
                  className="rounded text-brand-blue focus:ring-brand-blue"
                />
                <span>Visible on Website</span>
              </label>
            </div>

            <button type="submit" className="btn-primary text-xs py-2 px-4">
              <Save className="w-3.5 h-3.5 mr-1" /> Save Team Member
            </button>
          </div>
        </form>
      </div>

      {/* Existing Team Members List */}
      <div className="space-y-4">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Current Team Members ({members.length})
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {members.map((m) => (
            <div
              key={m.id}
              className="glass-card p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-brand-violet to-brand-blue text-white font-heading font-bold text-lg flex items-center justify-center shrink-0 shadow-glowSm">
                  {m.initials}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-lg text-foreground">
                      {m.name}
                    </h3>
                    <span className="text-[11px] font-semibold text-brand-blue px-2 py-0.5 rounded-full bg-brand-blue/10">
                      {m.role}
                    </span>
                    {!m.visible && (
                      <span className="text-[10px] text-rose-400 px-2 py-0.5 rounded-full bg-rose-500/10">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted leading-relaxed line-clamp-2 max-w-2xl">
                    {m.bio}
                  </p>
                  {m.linkedinUrl && (
                    <a
                      href={m.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-brand-blue hover:underline inline-block mt-1"
                    >
                      {m.linkedinUrl}
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <form action={async () => {
                  "use server";
                  await deleteTeamMemberAction(m.id);
                }}>
                  <button
                    type="submit"
                    className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs transition-colors"
                    title="Delete member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
