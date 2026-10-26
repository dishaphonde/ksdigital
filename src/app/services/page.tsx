import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  Search,
  Share2,
  Laptop,
  Cpu,
  Palette,
  Globe,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Digital Marketing Services | SEO, PPC & Social | KS Digital",
  description:
    "Explore KS Digital's digital marketing services including SEO, performance marketing, social media, website design, marketing automation and creative design.",
  alternates: {
    canonical: "https://ksdigital.co.in/services/",
  },
};

export default async function ServicesHubPage() {
  const services = await getServices();

  const serviceIconMap: Record<string, React.ReactNode> = {
    TrendingUp: <TrendingUp className="w-7 h-7 text-brand-blue" />,
    Search: <Search className="w-7 h-7 text-brand-blue" />,
    Share2: <Share2 className="w-7 h-7 text-brand-blue" />,
    Laptop: <Laptop className="w-7 h-7 text-brand-blue" />,
    Cpu: <Cpu className="w-7 h-7 text-brand-blue" />,
    Palette: <Palette className="w-7 h-7 text-brand-blue" />,
    Globe: <Globe className="w-7 h-7 text-brand-blue" />,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "KS Digital Marketing Services",
        provider: {
          "@type": "Organization",
          name: "KS Digital",
          url: "https://ksdigital.co.in/",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Digital Marketing Services",
          itemListElement: services.map((s, idx) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.summary,
              url: `https://ksdigital.co.in/${s.slug}/`,
            },
            position: idx + 1,
          })),
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── Hero ─── */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 text-center border-b border-white/5 relative bg-white/[0.01]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-blue/10 text-brand-blue border border-brand-blue/20 mb-4">
            Our Capabilities
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6">
            Full-Funnel Digital Services for <span className="gradient-text">Measurable Growth</span>
          </h1>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From technical SEO audits to programmatic ad buying and conversion-optimized websites, our integrated services drive pipeline.
          </p>
        </div>
      </section>

      {/* ─── Services Grid ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="glass-card p-8 flex flex-col justify-between group hover:border-brand-blue/50 transition-all duration-300"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mb-6 shadow-glowSm">
                    {serviceIconMap[service.icon || "TrendingUp"] || (
                      <TrendingUp className="w-7 h-7 text-brand-blue" />
                    )}
                  </div>

                  <h2 className="font-heading text-2xl font-bold text-foreground mb-3 group-hover:text-brand-blue transition-colors">
                    {service.title}
                  </h2>

                  <p className="text-sm text-muted leading-relaxed mb-6">
                    {service.summary}
                  </p>

                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2 mb-8 pt-4 border-t border-white/5">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-muted">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <Link
                    href={`/${service.slug}`}
                    className="text-xs font-semibold uppercase tracking-wider text-brand-blue inline-flex items-center gap-1.5 group-hover:underline"
                  >
                    View Details & Scope <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="py-16 pb-24 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            Need a Tailored Multi-Channel Strategy?
          </h2>
          <p className="text-muted text-base max-w-xl mx-auto">
            Schedule a strategy call with Ketan Sawant to assess your current performance and determine the optimal marketing allocation.
          </p>
          <div className="pt-2">
            <Link href="/contact-us" className="btn-primary">
              Book a Strategy Call <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
