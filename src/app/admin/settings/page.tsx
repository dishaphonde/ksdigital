import { redirect } from "next/navigation";
import { Save, Settings } from "lucide-react";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { saveSiteSettingsAction } from "@/app/actions/admin";
import { getSiteSettings } from "@/lib/data";

export default async function AdminSettingsPage() {
  const session = await verifySession();
  if (!session) redirect("/admin");

  const settings = await getSiteSettings();

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
          Site Settings & Channels
        </h1>
        <p className="text-muted text-sm mt-1">
          Update agency phone number, WhatsApp contact link, email address, and social links site-wide.
        </p>
      </div>

      <div className="glass-card p-6 sm:p-8 space-y-6">
        <form action={saveSiteSettingsAction} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                defaultValue={settings.businessName}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-foreground text-sm focus:outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                Contact Phone
              </label>
              <input
                type="tel"
                name="phone"
                defaultValue={settings.phone}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-foreground text-sm focus:outline-none focus:border-brand-blue"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                WhatsApp Phone (digits with country code)
              </label>
              <input
                type="text"
                name="whatsappNumber"
                defaultValue={settings.whatsappNumber}
                required
                placeholder="917276503159"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-foreground text-sm focus:outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                Agency Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={settings.email}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-foreground text-sm focus:outline-none focus:border-brand-blue"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                Instagram Profile URL
              </label>
              <input
                type="url"
                name="instagramUrl"
                defaultValue={settings.instagramUrl || "https://instagram.com/ksdigital.ai"}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-foreground text-sm focus:outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                LinkedIn Company URL
              </label>
              <input
                type="url"
                name="linkedinUrl"
                defaultValue={settings.linkedinUrl || "https://www.linkedin.com/company/ksdigital-performance/"}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-foreground text-sm focus:outline-none focus:border-brand-blue"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
              Footer Brand Statement
            </label>
            <input
              type="text"
              name="footerText"
              defaultValue={settings.footerText || ""}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-foreground text-sm focus:outline-none focus:border-brand-blue"
            />
          </div>

          <div className="pt-2 text-right">
            <button type="submit" className="btn-primary text-xs py-2 px-5">
              <Save className="w-3.5 h-3.5 mr-1" /> Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
