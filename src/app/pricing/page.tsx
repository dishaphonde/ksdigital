import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Sparkles, HelpCircle } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import FaqAccordion from "@/components/FaqAccordion";
import ContactForm from "@/components/ContactForm";
import { getPricingPlans, getFaqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Digital Marketing Packages & Pricing | KS Digital",
  description:
    "Explore KS Digital digital marketing packages for SEO, social media, PPC, content and growth. Compare plans and request a package tailored to your business.",
  alternates: {
    canonical: "https://ksdigital.co.in/pricing/",
  },
};

export default async function PricingPage() {
  const [plans, faqs] = await Promise.all([
    getPricingPlans(),
    getFaqs("pricing"),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://ksdigital.co.in/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Pricing",
            item: "https://ksdigital.co.in/pricing/",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── Page Hero ─── */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 text-center border-b border-white/5 relative bg-white/[0.01]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-blue/10 text-brand-blue border border-brand-blue/20 mb-4">
            Transparent Investment
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6">
            Growth Packages Built for <span className="gradient-text">Measurable Value</span>
          </h1>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Transparent pricing without hidden retainers or confusing contracts. Choose the tier that matches your current business stage.
          </p>
        </div>
      </section>

      {/* ─── Pricing Grid ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`glass-card p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  plan.highlighted
                    ? "border-brand-blue/60 shadow-glowBlue ring-1 ring-brand-blue/40 -translate-y-2"
                    : "hover:border-white/20"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-brand-blue to-brand-violet text-white text-[11px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Most Popular
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-1">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1 my-3">
                      <span className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground">
                        {plan.price}
                      </span>
                      {plan.billingNote && (
                        <span className="text-xs text-muted font-medium">
                          {plan.billingNote}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted leading-relaxed min-h-[36px]">
                      {plan.description}
                    </p>
                  </div>

                  {plan.bestFor && (
                    <div className="mb-6 p-3 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-muted">
                      <strong className="text-foreground">Best for:</strong> {plan.bestFor}
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/5 space-y-3 mb-8">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Inclusions
                    </p>
                    <ul className="space-y-2.5">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-muted">
                          <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <a
                    href="#inquiry"
                    className={`w-full py-3 text-center text-xs font-semibold uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-1.5 ${
                      plan.highlighted
                        ? "btn-primary shadow-glowBlue"
                        : "btn-secondary"
                    }`}
                  >
                    {plan.ctaText} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted mt-10 max-w-xl mx-auto">
            * Plan fees cover agency strategy, creative assets, and campaign management. Advertising budget is separate and managed transparently on your behalf.
          </p>
        </div>
      </section>

      {/* ─── Contact Form Section ─── */}
      <section id="inquiry" className="py-20 md:py-28 bg-white/[0.02] border-y border-white/5 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Custom Package Request"
            title="Ready to Select Your"
            gradientTitle="Growth Plan?"
            description="Leave your details below and our team will prepare your onboarding scope."
          />
          <ContactForm
            title="Request Package Details"
            subtitle="Let us know your goals and preferred plan tier."
          />
        </div>
      </section>

      {/* ─── FAQs ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Pricing FAQ"
            title="Frequently Asked"
            gradientTitle="Pricing Questions"
            description="Clear answers about billing cycles, ad spend management, and contract options."
          />
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}
