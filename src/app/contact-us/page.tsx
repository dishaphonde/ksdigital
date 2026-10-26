import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Mail, Linkedin, MessageCircle, Clock, MapPin } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";
import { getFaqs, getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact KS Digital | Digital Marketing Agency",
  description:
    "Talk to KS Digital about SEO, performance marketing, social media, web design and digital growth. Contact our team to discuss your goals and requirements.",
  alternates: {
    canonical: "https://ksdigital.co.in/contact-us/",
  },
};

export default async function ContactUsPage() {
  const [faqs, settings] = await Promise.all([
    getFaqs("home"),
    getSiteSettings(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: "Contact KS Digital",
        description: "Get in touch with the digital marketing specialists at KS Digital.",
        url: "https://ksdigital.co.in/contact-us/",
      },
      {
        "@type": "Organization",
        name: "KS Digital",
        telephone: settings.phone,
        email: settings.email,
        url: "https://ksdigital.co.in/",
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
            Get in Touch
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6">
            Let&apos;s Discuss Your <span className="gradient-text">Growth Objectives</span>
          </h1>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions, campaigns to scale, or a website to rebuild? Reach out directly to our team and start a conversation.
          </p>
        </div>
      </section>

      {/* ─── Main Content Grid ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                  Direct Agency Contact
                </h2>
                <p className="text-muted text-sm sm:text-base leading-relaxed">
                  After you submit your inquiry, our strategy team evaluates your website and responds within 24 hours with actionable recommendations.
                </p>
              </div>

              {/* Contact Channels */}
              <div className="space-y-4">
                <a
                  href="tel:+917276503159"
                  className="glass-card p-5 flex items-center gap-4 group hover:border-brand-blue/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 text-brand-blue flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-muted font-semibold">
                      Phone Number
                    </span>
                    <span className="text-foreground font-semibold text-base">
                      +91 7276503159
                    </span>
                  </div>
                </a>

                <a
                  href="mailto:sawantketan87@gmail.com"
                  className="glass-card p-5 flex items-center gap-4 group hover:border-brand-blue/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-violet/10 border border-brand-violet/20 text-brand-violet flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-muted font-semibold">
                      Email Address
                    </span>
                    <span className="text-foreground font-semibold text-base">
                      sawantketan87@gmail.com
                    </span>
                  </div>
                </a>

                <a
                  href="https://wa.me/917276503159"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-5 flex items-center gap-4 group hover:border-emerald-500/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-muted font-semibold">
                      Instant WhatsApp
                    </span>
                    <span className="text-foreground font-semibold text-base">
                      Chat with Ketan Sawant
                    </span>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/ketan-sawant-7b5941194/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-5 flex items-center gap-4 group hover:border-brand-blue/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 text-brand-blue flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-muted font-semibold">
                      Founder Profile
                    </span>
                    <span className="text-foreground font-semibold text-base">
                      LinkedIn: Ketan Sawant
                    </span>
                  </div>
                </a>
              </div>

              {/* Support image */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <Image
                  src="/images/businesswoman.png"
                  alt="KS Digital Client Support"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-xs text-muted font-medium">
                  Client Strategy & Support Hub
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm
                title="Send Us a Message"
                subtitle="Fill out the form below and let us know your requirements. We respond promptly."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 md:py-28 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="FAQ"
            title="Questions About Reaching Out"
            description="Find quick answers regarding our onboarding process and response timelines."
          />
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}
