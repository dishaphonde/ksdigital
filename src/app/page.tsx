import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  TrendingUp,
  Search,
  Share2,
  Laptop,
  Cpu,
  Palette,
  CheckCircle2,
  Target,
  Layers,
  Repeat,
  Phone,
  Calendar,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import TeamCard from "@/components/TeamCard";
import FaqAccordion from "@/components/FaqAccordion";
import {
  getSiteSettings,
  getServices,
  getTeamMembers,
  getFaqs,
  getBlogPosts,
} from "@/lib/data";

export default async function HomePage() {
  const [settings, services, teamMembers, faqs, blogPosts] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getTeamMembers(),
    getFaqs("home"),
    getBlogPosts(),
  ]);

  const founder = teamMembers.find((m) => m.slug === "ketan-sawant") || teamMembers[0];

  // Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://ksdigital.co.in/#organization",
        name: settings.businessName || "KS Digital",
        url: "https://ksdigital.co.in/",
        logo: "https://ksdigital.co.in/images/stats_photo.png",
        telephone: settings.phone,
        email: settings.email,
        sameAs: [
          settings.instagramUrl || "https://instagram.com/ksdigital.ai",
          settings.linkedinUrl || "https://www.linkedin.com/company/ksdigital-performance/",
        ],
        founder: {
          "@type": "Person",
          name: founder?.name || "Ketan Sawant",
          jobTitle: founder?.role || "Founder",
          url: founder?.linkedinUrl || "https://www.linkedin.com/in/ketan-sawant-7b5941194/",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://ksdigital.co.in/#website",
        url: "https://ksdigital.co.in/",
        name: "KS Digital",
        publisher: { "@id": "https://ksdigital.co.in/#organization" },
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

  const serviceIconMap: Record<string, React.ReactNode> = {
    TrendingUp: <TrendingUp className="w-6 h-6 text-brand-blue" />,
    Search: <Search className="w-6 h-6 text-brand-blue" />,
    Share2: <Share2 className="w-6 h-6 text-brand-blue" />,
    Laptop: <Laptop className="w-6 h-6 text-brand-blue" />,
    Cpu: <Cpu className="w-6 h-6 text-brand-blue" />,
    Palette: <Palette className="w-6 h-6 text-brand-blue" />,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── Hero Section ─── */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        {/* Glow ambient background orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-violet/20 via-brand-blue/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
                Performance Marketing & SEO Agency
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Digital Marketing That Turns Traffic Into{" "}
                <span className="gradient-text">Measurable Growth</span>
              </h1>

              <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                SEO, performance marketing, social media, and website design engineered for growing businesses looking to strengthen customer acquisition and ROI.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link href="/contact-us" className="btn-primary w-full sm:w-auto">
                  Book a Strategy Call <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <Link href="/services" className="btn-secondary w-full sm:w-auto">
                  View Our Services
                </Link>
              </div>

              {/* Trust signals */}
              <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-muted">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Transparent Attribution
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Senior Strategy Specialists
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Full-Funnel Optimization
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <Image
                  src="/images/stats_photo.png"
                  alt="KS Digital Marketing Strategy and Growth"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 glass-card border-white/10">
                  <p className="text-xs font-semibold text-brand-blue uppercase tracking-wider">
                    Performance Focused
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    Data-backed campaign scaling across search, paid media & conversion funnels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mini Feature Strip ─── */}
      <section className="py-8 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 border-white/5">
              <h4 className="font-heading text-lg font-bold text-foreground mb-1">
                Data-Driven Marketing
              </h4>
              <p className="text-sm text-muted">
                Scale faster with smarter campaign targeting, budget allocation, and continuous A/B testing.
              </p>
            </div>
            <div className="glass-card p-6 border-white/5">
              <h4 className="font-heading text-lg font-bold text-foreground mb-1">
                Social Growth
              </h4>
              <p className="text-sm text-muted">
                Creative assets, audience engagement, and multi-channel reach that builds brand equity.
              </p>
            </div>
            <div className="glass-card p-6 border-white/5">
              <h4 className="font-heading text-lg font-bold text-foreground mb-1">
                Conversion Web Design
              </h4>
              <p className="text-sm text-muted">
                Modern responsive layouts engineered to turn website visitors into qualified paying clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── About Teaser ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <SectionHeader
                subtitle="About KS Digital"
                title="Helping Businesses Grow With"
                gradientTitle="Measurable ROI"
                description="We help brands grow faster through data-driven digital marketing and scalable growth strategies. Our tailored approach focuses on building long-term value, optimizing acquisitions, and capturing revenue opportunities."
                align="left"
                className="mb-6"
              />

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-muted border border-white/10">
                  #PerformanceMarketing
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-muted border border-white/10">
                  #SEOStrategy
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-muted border border-white/10">
                  #WebDevelopment
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-muted border border-white/10">
                  #MarketingAutomation
                </span>
              </div>

              <div>
                <Link href="/about-us" className="btn-secondary">
                  Learn More About Us <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/team_photo.png"
                alt="KS Digital Agency Strategy Hub"
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services Grid ─── */}
      <section className="py-20 md:py-28 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Our Expertise"
            title="Elevate Your Digital Presence With"
            gradientTitle="Tailored Services"
            description="End-to-end digital marketing services designed to expand organic traffic, qualified leads, and sustained revenue."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service) => (
              <div
                key={service.id}
                className="glass-card p-8 flex flex-col justify-between group hover:border-brand-blue/50 transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mb-6 shadow-glowSm">
                    {serviceIconMap[service.icon || "TrendingUp"] || (
                      <TrendingUp className="w-6 h-6 text-brand-blue" />
                    )}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-brand-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-6">
                    {service.summary}
                  </p>
                </div>

                <Link
                  href={`/${service.slug}`}
                  className="text-xs font-semibold uppercase tracking-wider text-brand-blue inline-flex items-center gap-1.5 group-hover:underline"
                >
                  Explore {service.title} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/services" className="btn-secondary">
              View All 7 Specializations <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Process Section ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="How We Work"
            title="A Clear Process for"
            gradientTitle="Predictable Growth"
            description="Start with your business goals, choose a focused channel strategy, and refine campaigns with transparent metrics."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="glass-card p-8 relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-blue to-brand-violet text-white font-heading font-bold flex items-center justify-center mb-6 shadow-glowSm">
                1
              </div>
              <h4 className="font-heading text-xl font-bold text-foreground mb-2">
                Understand Your Goals
              </h4>
              <p className="text-sm text-muted leading-relaxed">
                We review your current funnel, ideal customer profiles, existing marketing assets, and target acquisition benchmarks.
              </p>
            </div>

            <div className="glass-card p-8 relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-blue to-brand-violet text-white font-heading font-bold flex items-center justify-center mb-6 shadow-glowSm">
                2
              </div>
              <h4 className="font-heading text-xl font-bold text-foreground mb-2">
                Plan & Execute
              </h4>
              <p className="text-sm text-muted leading-relaxed">
                Deploy high-intent search campaigns, creative ad variations, technical SEO enhancements, and conversion landing pages.
              </p>
            </div>

            <div className="glass-card p-8 relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-blue to-brand-violet text-white font-heading font-bold flex items-center justify-center mb-6 shadow-glowSm">
                3
              </div>
              <h4 className="font-heading text-xl font-bold text-foreground mb-2">
                Measure & Improve
              </h4>
              <p className="text-sm text-muted leading-relaxed">
                Continuous A/B testing, weekly conversion analysis, and attribution reporting ensure every marketing rupee performs efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section className="py-20 md:py-28 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <SectionHeader
                subtitle="Why Partners Choose Us"
                title="Choose Us to"
                gradientTitle="Scale Your Brand"
                description="We focus on data-driven strategies, measurable results, and long-term business growth. We do not hide behind empty vanity metrics—we report on revenue and conversions."
                align="left"
                className="mb-6"
              />

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0">
                    <Target className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-foreground mb-1">
                      Results-Driven Approach
                    </h4>
                    <p className="text-sm text-muted leading-relaxed">
                      Everything we plan, build, or launch is driven by performance data and optimization variables focused directly on growth.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-violet/10 border border-brand-violet/20 flex items-center justify-center shrink-0">
                    <Layers className="w-6 h-6 text-brand-violet" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-foreground mb-1">
                      Multi-Platform Expertise
                    </h4>
                    <p className="text-sm text-muted leading-relaxed">
                      From Google Ads and DV360 to Meta Ads, programmatic DSPs, technical SEO architecture, and conversion web design.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0">
                    <Repeat className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-foreground mb-1">
                      Continuous Optimization
                    </h4>
                    <p className="text-sm text-muted leading-relaxed">
                      Systematic creative testing, landing page iteration, and audience refinement to scale performance without ad fatigue.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/team_handshake.png"
                alt="KS Digital Business Partnerships"
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Team Section (Short Home Preview) ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Our Expertise"
            title="Meet Our"
            gradientTitle="Growth Team"
            description="A dedicated team of digital marketers, search strategists, developers, and creatives committed to driving real business results."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.slice(0, 4).map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/about-us" className="btn-secondary">
              View All Team Bios & Roles <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Insights / Blog Preview ─── */}
      <section className="py-20 md:py-28 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Our Insights"
            title="Latest Marketing"
            gradientTitle="Strategies & Guides"
            description="Explore our guides on programmatic media buying, high-performance SEO, and conversion optimization."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {blogPosts.slice(0, 2).map((post) => (
              <article
                key={post.id}
                className="glass-card p-6 sm:p-8 flex flex-col justify-between group hover:border-brand-blue/50 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-muted mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-brand-blue/10 text-brand-blue font-semibold">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-brand-blue transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted line-clamp-3 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-muted">
                    By <strong className="text-foreground">{post.authorName}</strong>
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-semibold text-brand-blue inline-flex items-center gap-1 group-hover:underline"
                  >
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/blog" className="btn-secondary">
              Browse All Insights <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="FAQ"
            title="Frequently Asked"
            gradientTitle="Questions"
            description="Everything you need to know about partnering with KS Digital for your digital marketing."
          />
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* ─── Bottom CTA Banner ─── */}
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 sm:p-12 lg:p-16 border-brand-blue/30 relative overflow-hidden bg-gradient-to-br from-brand-blue/10 via-brand-violet/5 to-transparent shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                  Grow Better With KS Digital Today
                </h2>
                <p className="text-muted text-base sm:text-lg max-w-xl leading-relaxed">
                  Partner with us to create data-driven performance campaigns, scale qualified traffic, and optimize customer acquisition costs.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link href="/contact-us" className="btn-primary">
                    Book a Strategy Call <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                  <Link href="/pricing" className="btn-secondary">
                    View Pricing Packages
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white/70 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur-sm">
                <div>
                  <h4 className="font-heading text-lg font-bold text-foreground">
                    Ketan Sawant
                  </h4>
                  <p className="text-xs text-brand-blue font-semibold uppercase tracking-wider">
                    Founder, KS Digital
                  </p>
                </div>
                <blockquote className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed">
                  &ldquo;My skill sets are tuned to build and scale products and organizations. With deep expertise in Performance Marketing, Affiliate Marketing, Team building & handling, and operations management, I focus on handling top-line and bottom-line revenue KPIs.&rdquo;
                </blockquote>
                <div className="pt-2">
                  <a
                    href="tel:+917276503159"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"
                  >
                    <Phone className="w-4 h-4" /> +91 7276503159
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
