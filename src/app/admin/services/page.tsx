import { redirect } from "next/navigation";
import { Save, Briefcase, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { saveServiceAction } from "@/app/actions/admin";
import { fallbackServices } from "@/lib/data";

export default async function AdminServicesPage() {
  const session = await verifySession();
  if (!session) redirect("/admin");

  let services: any[] = [];
  try {
    services = await prisma.service.findMany({
      orderBy: { order: "asc" },
    });
  } catch (err) {
    console.error("Services query error:", err);
  }

  if (services.length === 0) {
    services = fallbackServices;
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
          Services CMS
        </h1>
        <p className="text-muted text-sm mt-1">
          Edit service titles, summaries, key deliverables, and content blocks rendered on dedicated service landing pages.
        </p>
      </div>

      <div className="space-y-6">
        {services.map((service) => (
          <div key={service.id} className="glass-card p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h2 className="font-heading text-xl font-bold text-foreground">
                {service.title}
              </h2>
              <span className="text-xs text-brand-blue font-mono">
                /{service.slug}/
              </span>
            </div>

            <form action={saveServiceAction} className="space-y-4">
              <input type="hidden" name="id" value={service.id} />
              <input type="hidden" name="title" value={service.title} />
              <input type="hidden" name="slug" value={service.slug} />

              <div>
                <label className="block text-[11px] font-semibold uppercase text-muted mb-1">
                  Summary Teaser
                </label>
                <input
                  type="text"
                  name="summary"
                  defaultValue={service.summary}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-foreground text-sm focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-muted mb-1">
                  Detailed Approach / Scope Content
                </label>
                <textarea
                  name="content"
                  rows={3}
                  defaultValue={service.content}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-foreground text-xs focus:outline-none focus:border-brand-blue resize-y"
                ></textarea>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-muted mb-1">
                  Key Inclusions / Features (one per line)
                </label>
                <textarea
                  name="features"
                  rows={4}
                  defaultValue={(service.features || []).join("\n")}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-foreground text-xs focus:outline-none focus:border-brand-blue font-mono resize-y"
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-xs text-muted cursor-pointer">
                  <input
                    type="checkbox"
                    name="visible"
                    value="true"
                    defaultChecked={service.visible}
                    className="rounded text-brand-blue"
                  />
                  <span>Visible on Public Website</span>
                </label>

                <button type="submit" className="btn-primary text-xs py-1.5 px-3">
                  <Save className="w-3.5 h-3.5 mr-1" /> Save Service
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
