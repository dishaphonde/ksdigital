import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import TeamCard from "@/components/TeamCard";
import FaqAccordion from "@/components/FaqAccordion";
import { getTeamMembers, getFaqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "About KS Digital | Digital Marketing Experts & Team",
  description:
    "Meet the KS Digital team and learn how our SEO, performance marketing, social media, web and growth experts help businesses build measurable digital growth.",
  alternates: {
    canonical: "https://ksdigital.co.in/about-us/",
  },
};

export default async function AboutUsPage() {
  const [teamMembers, faqs] = await Promise.all([
    getTeamMembers(),
    getFaqs("home"),
  ]);

  // Person JSON-LD for each team member
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://ksdigital.co.in/#organization",
        name: "KS Digital",
        url: "https://ksdigital.co.in/",
        telephone: "+917276503159",
        email: "sawantketan87@gmail.com",
      },
      ...teamMembers.map((m) => ({
        "@type": "Person",
        "@id": `https://ksdigital.co.in/about-us/#${m.slug}`,
        name: m.name,
        jobTitle: m.role,
        worksFor: { "@id": "https://ksdigital.co.in/#organization" },
        url: m.linkedinUrl || "https://ksdigital.co.in/about-us/",
        sameAs: m.linkedinUrl ? [m.linkedinUrl] : [],
        description: m.shortBio || m.bio,
      })),
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
            name: "About KS Digital",
            item: "https://ksdigital.co.in/about-us/",
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

      {/* ─── Page Hero ─── */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 relative overflow-hidden text-center border-b border-white/5 bg-white/[0.01]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-blue/10 text-brand-blue border border-brand-blue/20 mb-4">
            Who We Are
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6">
            Data-Driven Strategists & <span className="gradient-text">Growth Engineers</span>
          </h1>
          <p className="text-muted text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            We partner with ambitious founders and business leaders to turn digital marketing into a predictable revenue acquisition engine.
          </p>
        </div>
      </section>

      {/* ─── Intro Section ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <SectionHeader
                subtitle="Helping Businesses Scale"
                title="Scale Faster With"
                gradientTitle="Smarter Marketing"
                description="We help brands grow faster through data-driven digital marketing and scalable growth strategies. By aligning your business goals with performance marketing channels, SEO, and optimized web design, we drive transparent results you can measure in revenue."
                align="left"
                className="mb-6"
              />

              <div className="space-y-4 text-muted text-sm sm:text-base leading-relaxed">
                <p>
                  At KS Digital, our focus is simple: eliminate wasted advertising spend and replace guesswork with continuous algorithmic optimization. Whether launching programmatic ad campaigns or scaling organic search presence, our strategies are built on attribution integrity.
                </p>
              </div>

              <div className="pt-2">
                <Link href="/contact-us" className="btn-primary">
                  Start a Conversation <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/team_handshake.png"
                alt="Collaborative Business Partnerships"
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mission Section ─── */}
      <section className="py-20 md:py-28 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/images/senior_man.png"
                  alt="KS Digital Leadership"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 glass-card border-white/10">
                  <p className="text-xs text-brand-blue font-semibold uppercase tracking-wider">
                    Leadership Philosophy
                  </p>
                  <blockquote className="text-xs sm:text-sm text-gray-200 italic mt-1">
                    &ldquo;We build digital bridges between brands and customers through data integrity and continuous testing.&rdquo;
                  </blockquote>
                  <p className="text-xs text-muted mt-2">— Ketan Sawant, Founder</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <SectionHeader
                subtitle="Our Purpose"
                title="Innovative Digital Solutions That"
                gradientTitle="Elevate Your Brand"
                description="Our mission is to empower businesses with innovative, data-driven digital marketing strategies that drive measurable growth. We aim to help brands stand out online through smart technology, creativity, and performance-focused marketing."
                align="left"
                className="mb-6"
              />
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                We partner closely with founders and executive leadership to align both top-line customer volume and bottom-line profit margins. With senior expertise spanning DV360 programmatic advertising, 14+ years of SEO architecture, and conversion-focused web engineering, we deliver results that last.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Core Values ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Our Foundation"
            title="Values That Drive Our"
            gradientTitle="Marketing Standards"
            description="These core principles guide how we manage campaigns, interact with clients, and optimize budgets every day."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 hover:border-brand-blue/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                Growth Synergy
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Collaborating closely with clients to create scalable, long-term growth. We operate as an integrated extension of your internal team.
              </p>
            </div>

            <div className="glass-card p-8 hover:border-brand-violet/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-violet/10 border border-brand-violet/20 flex items-center justify-center text-brand-violet mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                Results Integrity
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Delivering transparent, data-driven results you can trust. No hidden fees, no exaggerated vanity metrics, just real performance.
              </p>
            </div>

            <div className="glass-card p-8 hover:border-brand-blue/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                Team Agility
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                A flexible, fast-moving team adapting to market changes, algorithm updates, and platform capabilities in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Part B: Full Team Section ─── */}
      <section id="team" className="py-20 md:py-28 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Meet Our Expertise"
            title="The Leadership &"
            gradientTitle="Specialists Behind KS Digital"
            description="A passionate team of digital marketers, search advisors, programmatic experts, developers, and finance leadership dedicated to driving real business growth."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Careers Teaser ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
            Careers
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            Be Part of Our Digital Marketing Team
          </h2>
          <p className="text-muted text-base leading-relaxed">
            We are always looking for passionate digital strategists, SEO specialists, designers, and web developers to build future-proof growth engines.
          </p>
          <div className="pt-2">
            <Link href="/contact-us" className="btn-secondary">
              Join Our Team <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 md:py-28 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="FAQ"
            title="Common Questions About"
            gradientTitle="Our Agency"
            description="Everything you need to know about how we manage client campaigns and partnerships."
          />
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}
