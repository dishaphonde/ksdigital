import { redirect } from "next/navigation";
import { Save, Plus, DollarSign, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { savePricingPlanAction } from "@/app/actions/admin";
import { fallbackPricingPlans } from "@/lib/data";

export default async function AdminPricingPage() {
  const session = await verifySession();
  if (!session) redirect("/admin");

  let plans: any[] = [];
  try {
    plans = await prisma.pricingPlan.findMany({
      orderBy: { order: "asc" },
    });
  } catch (err) {
    console.error("Pricing query error:", err);
  }

  if (plans.length === 0) {
    plans = fallbackPricingPlans;
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
          Pricing Packages CMS
        </h1>
        <p className="text-muted text-sm mt-1">
          Update monthly rates, package inclusions, and best-for recommendations shown on the public pricing page.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`glass-card p-6 sm:p-8 space-y-5 ${
              plan.highlighted ? "border-brand-blue/50 ring-1 ring-brand-blue/20" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-foreground">
                {plan.name}
              </h2>
              {plan.highlighted && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue">
                  Most Popular Badge
                </span>
              )}
            </div>

            <form action={savePricingPlanAction} className="space-y-4">
              <input type="hidden" name="id" value={plan.id} />
              <input type="hidden" name="name" value={plan.name} />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-muted mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    defaultValue={plan.price}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-foreground text-sm focus:outline-none focus:border-brand-blue font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-muted mb-1">
                    Billing Note
                  </label>
                  <input
                    type="text"
                    name="billingNote"
                    defaultValue={plan.billingNote || "/month"}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-foreground text-sm focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-muted mb-1">
                  Summary Description
                </label>
                <input
                  type="text"
                  name="description"
                  defaultValue={plan.description || ""}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-foreground text-sm focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-muted mb-1">
                  Best For Recommendation
                </label>
                <input
                  type="text"
                  name="bestFor"
                  defaultValue={plan.bestFor || ""}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-foreground text-sm focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-muted mb-1">
                  Features (one per line)
                </label>
                <textarea
                  name="features"
                  rows={5}
                  defaultValue={(plan.features || []).join("\n")}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-foreground text-xs focus:outline-none focus:border-brand-blue font-mono resize-y"
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-xs text-muted cursor-pointer">
                  <input
                    type="checkbox"
                    name="highlighted"
                    value="true"
                    defaultChecked={plan.highlighted}
                    className="rounded text-brand-blue"
                  />
                  <span>Highlight as Popular</span>
                </label>

                <button type="submit" className="btn-primary text-xs py-1.5 px-3">
                  <Save className="w-3.5 h-3.5 mr-1" /> Save Plan
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
