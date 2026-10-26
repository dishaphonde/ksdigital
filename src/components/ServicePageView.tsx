import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone, Sparkles } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export interface ServiceDetail {
  title: string;
  slug: string;
  summary: string;
  content: string;
  features: string[];
  seoTitle?: string | null;
  seoDesc?: string | null;
}

export default function ServicePageView({
  service,
  relatedServices = [],
}: {
  service: ServiceDetail;
  relatedServices?: { title: string; slug: string; summary: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        description: service.summary,
        provider: {
          "@type": "Organization",
          name: "KS Digital",
          url: "https://ksdigital.co.in/",
        },
        url: `https://ksdigital.co.in/${service.slug}/`,
      },
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
            name: "Services",
            item: "https://ksdigital.co.in/services/",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: `https://ksdigital.co.in/${service.slug}/`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── Breadcrumb & Hero ─── */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 border-b border-white/5 relative bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-muted">
              <li>
                <Link href="/" className="hover:text-brand-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/services" className="hover:text-brand-blue transition-colors">
                  Services
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">{service.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
                Core Service
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight">
                {service.title}
              </h1>
              <p className="text-muted text-base sm:text-xl leading-relaxed max-w-2xl">
                {service.summary}
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <a href="#inquiry" className="btn-primary">
                  Request a Proposal <ArrowRight className="w-4 h-4 ml-1" />
                </a>
                <a href="tel:+917276503159" className="btn-secondary">
                  <Phone className="w-4 h-4 mr-1 text-brand-blue" /> +91 7276503159
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 glass-card p-6 border-brand-blue/30 space-y-4">
              <h3 className="font-heading font-bold text-foreground text-lg">
                Key Inclusions
              </h3>
              <ul className="space-y-3">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-muted">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Service Overview & Content ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <div className="glass-card p-8 sm:p-10 space-y-6">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                  Our Approach to {service.title}
                </h2>
                <div className="text-muted text-base leading-relaxed space-y-4">
                  <p>{service.content}</p>
                  <p>
                    We deploy custom campaign frameworks tailored to your business model. Every KPI is tracked through real-time dashboards with clear attribution, so your leadership team has complete visibility over return on investment.
                  </p>
                </div>
              </div>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="space-y-6 pt-6">
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    Related Digital Services
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedServices.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/${rel.slug}`}
                        className="glass-card p-5 group hover:border-brand-blue/40 transition-colors"
                      >
                        <h4 className="font-heading font-semibold text-foreground group-hover:text-brand-blue text-base mb-1">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-muted line-clamp-2">
                          {rel.summary}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right form column */}
            <div id="inquiry" className="lg:col-span-4 scroll-mt-28">
              <ContactForm
                preselectedService={service.title}
                title={`Inquire About ${service.title}`}
                subtitle="Get a customized roadmap and pricing proposal tailored to your goals."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
