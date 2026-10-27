import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // 1. Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "sawantketan87@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "AdminKS2026!Secure";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: process.env.ADMIN_NAME || "Ketan Sawant",
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });
  console.log("✅ Super Admin ready:", admin.email);

  // 2. Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      businessName: "KS Digital",
      phone: "+917276503159",
      whatsappNumber: "917276503159",
      email: "sawantketan87@gmail.com",
      instagramUrl: "https://instagram.com/ksdigital.ai",
      linkedinUrl: "https://www.linkedin.com/company/ksdigital-performance/",
      footerText: "Boost Your Online Presence with Digital Marketing Services. Smart Strategies. Scalable Results.",
    },
  });
  console.log("✅ Site settings ready");

  // 3. Home Page Content
  await prisma.homePageContent.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      heroHeadline: "Digital Marketing That Turns Traffic Into Measurable Growth",
      heroSubtext: "SEO, performance marketing, social media, and website design for businesses looking to strengthen online visibility and customer acquisition.",
      heroCta1Text: "Book a Strategy Call",
      heroCta1Link: "/contact-us/",
      heroCta2Text: "View Our Services",
      heroCta2Link: "/services/",
      showProofStats: false,
    },
  });

  // 4. Team Members
  const team = [
    {
      name: "Ketan Sawant",
      role: "Founder",
      slug: "ketan-sawant",
      bio: "As a Digital Marketer my skill sets are tuned to build and scale products and organizations, have delivered growth which is needed in startup organization. Adept understanding business end to end user flows while working on strategic & critical bets, handled both topline and bottom-line KPIs for organization. My experience covers Performance Marketing, Affiliate marketing, Team building & handling and operations.",
      shortBio: "Founder & growth strategist with deep expertise in performance marketing, affiliate channels, and startup scaling.",
      initials: "KS",
      photo: "/images/team/ketan-sawant.jpg",
      linkedinUrl: "https://www.linkedin.com/in/ketan-sawant-7b5941194/",
      email: "sawantketan87@gmail.com",
      order: 1,
      visible: true,
    },
    {
      name: "Saumil Shah",
      role: "Senior SEO Advisor",
      slug: "saumil-shah",
      bio: "Successfully implemented Performance Marketing and Earned Media Channels. With more than 14+ years of experience in SEO, SMO, YouTube SEO, Google Stories, Google News & ASO. Responsible for the overall direction, coordination, development and evaluation of SEO, SMO and App promotions.",
      shortBio: "14+ years of expertise guiding SEO, Google Stories, Google News, and earned media growth.",
      initials: "SS",
      photo: "/images/team/saumil-shah.jpg",
      linkedinUrl: "https://www.linkedin.com/in/saumil-shah/",
      order: 2,
      visible: true,
    },
    {
      name: "Praneeth Yamsani",
      role: "Programmatic Ads Expert",
      slug: "praneeth-yamsani",
      bio: "Results-driven Programmatic Advertising and Performance Marketing Specialist with expertise in DV360, Google marketing platforms. Experienced in managing large-scale acquisition and retention campaigns across Google, Meta, affiliates, display, video, and YouTube with high monthly spends. Strong skills in audience segmentation, KPI, conversion optimization, and performance reporting using data-driven insights.",
      shortBio: "Specialist in DV360, Google Marketing Platform, DSPs, and high-volume acquisition campaigns.",
      initials: "PY",
      photo: "/images/team/praneeth-yamsani.jpg",
      order: 3,
      visible: true,
    },
    {
      name: "Prajwal Thombare",
      role: "Sr Web Developer",
      slug: "prajwal-thombare",
      bio: "Creative and detail-oriented Website Designer with a passion for building modern, user-friendly, and high-performing websites. I specialize in designing visually appealing layouts that not only look great but also deliver strong user experiences and business results. Focused on creating clean, responsive, and user-experience-driven websites that help brands grow online.",
      shortBio: "Builds high-performance, conversion-oriented websites engineered for user experience and SEO.",
      initials: "PT",
      photo: "/images/team/prajwal-thombare.jpg",
      order: 4,
      visible: true,
    },
    {
      name: "Tanisha Shah",
      role: "Chief Finance Officer (CFO)",
      slug: "tanisha-shah",
      bio: "Chief Finance Officer, KS Digital. Leads financial planning, resource allocation, and operational budgeting to support sustainable digital agency expansion.",
      shortBio: "Chief Finance Officer, KS Digital.",
      initials: "TS",
      order: 5,
      visible: true,
    },
  ];

  for (const m of team) {
    await prisma.teamMember.upsert({
      where: { slug: m.slug },
      update: m,
      create: m,
    });
  }
  console.log("✅ Team members seeded");

  // 5. Services
  const services = [
    {
      title: "Performance Marketing",
      slug: "performance-marketing",
      summary: "Data-driven ad campaigns focused on leads, sales, and measurable ROI across programmatic, search, and social media platforms.",
      content: "Maximize customer acquisition with precision-targeted advertising campaigns. We handle everything from audience segmentation, bidding strategies, and ad creatives to end-to-end attribution modeling across Google Ads, Meta Ads, DV360, and Programmatic DSPs.",
      icon: "TrendingUp",
      features: [
        "Google & Meta Ad Management",
        "Programmatic DSP & DV360 Campaigns",
        "Audience Segmentation & Retargeting",
        "Conversion Rate & ROAS Optimization",
        "Real-Time Attribution & Transparent Dashboards",
      ],
      seoTitle: "Performance Marketing Agency | KS Digital",
      seoDesc: "Drive measurable leads and sales with performance marketing from KS Digital. Get data-led paid campaigns, conversion optimisation and transparent reporting.",
      order: 1,
    },
    {
      title: "SEO Services",
      slug: "seo-services",
      summary: "Improve search visibility, increase search engine rankings, and attract high-intent organic traffic that converts into loyal clients.",
      content: "Holistic search engine optimization designed to generate sustainable organic pipeline. Our senior SEO advisors combine deep technical audits, content clusters, on-page optimization, Google Web Stories, and ethical authority-building to outrank competitors.",
      icon: "Search",
      features: [
        "Comprehensive Technical SEO Audits",
        "Search Intent Keyword Research & Mapping",
        "On-Page Optimization & Schema Markup",
        "Google News & Google Web Stories Integration",
        "Ethical Link Acquisition & Digital PR",
      ],
      seoTitle: "SEO Services for Businesses | KS Digital",
      seoDesc: "Grow qualified organic traffic, rankings and leads with SEO services from KS Digital. Get technical SEO, content, on-page and authority-building support.",
      order: 2,
    },
    {
      title: "Social Media Marketing",
      slug: "social-media-marketing",
      summary: "Build brand awareness, foster active community engagement, and drive consistent audience growth across primary networks.",
      content: "Turn passive scrollers into passionate brand advocates. We build and execute content strategies across Instagram, LinkedIn, YouTube, and Facebook that spark genuine conversations, expand organic reach, and nurture prospective clients.",
      icon: "Share2",
      features: [
        "Monthly Content Planning & Creative Direction",
        "Reels, Short-Form Video & Carousel Design",
        "Community Management & Active Engagement",
        "Influencer Collaboration & Outreach",
        "Performance Analytics & Engagement Reports",
      ],
      seoTitle: "Social Media Marketing Services | KS Digital",
      seoDesc: "Build reach, engagement and leads with social media marketing from KS Digital. Strategy, content, creative, publishing and performance optimization.",
      order: 3,
    },
    {
      title: "Website Design",
      slug: "website-design",
      summary: "Optimize user experience, build modern layouts, and deploy conversion-focused pages to turn clicks into paying customers.",
      content: "Your website is your agency's 24/7 revenue engine. We craft fast, responsive, and aesthetically stunning web experiences with clean code, mobile-first design, accessibility standards, and SEO architecture baked directly into every page.",
      icon: "Laptop",
      features: [
        "Modern, Responsive UI/UX Design",
        "Fast Page Speed & Core Web Vitals Optimization",
        "Conversion-Centered Landing Page Architecture",
        "Structured Data & Schema Implementation",
        "Cross-Browser & Multi-Device Testing",
      ],
      seoTitle: "Website Design & Development Services | KS Digital",
      seoDesc: "Build a fast, conversion-focused website with KS Digital. Get modern website design, responsive UX, SEO-ready structure and business-focused landing pages.",
      order: 4,
    },
    {
      title: "Marketing Automation",
      slug: "marketing-automation",
      summary: "Automate lead nurturing, email drip campaigns, follow-ups, and sales workflows to scale operations without expanding headcount.",
      content: "Never let another qualified lead slip through the cracks. We engineer automated CRM workflows, WhatsApp notification sequences, email drip campaigns, and lead scoring pipelines that nurture prospects from first click to closed sale automatically.",
      icon: "Cpu",
      features: [
        "Automated CRM Integration & Pipeline Triggers",
        "Multi-Stage Email Drip Campaigns",
        "Instant Lead Notification via WhatsApp & Email",
        "Lead Scoring & Routing Rules",
        "Customer Retention & Onboarding Workflows",
      ],
      seoTitle: "Marketing Automation Services | KS Digital",
      seoDesc: "Automate lead nurturing, follow-ups and customer journeys with KS Digital's marketing automation services and growth workflows.",
      order: 5,
    },
    {
      title: "Graphic Design",
      slug: "graphic-design",
      summary: "Creative designs, high-impact brand visual assets, and marketing creatives that communicate your message and capture attention.",
      content: "Stand out in crowded digital feeds with cohesive visual branding. From high-converting digital ad graphics and pitch decks to brand style guides and presentation assets, our designers craft polished visuals that elevate brand trust.",
      icon: "Palette",
      features: [
        "Performance Ad Creatives & Variations",
        "Social Media Post & Story Templates",
        "Pitch Decks & Commercial Presentations",
        "Brand Identity & Visual Style Guides",
        "Marketing Collateral & Infographics",
      ],
      seoTitle: "Graphic Design Services for Brands | KS Digital",
      seoDesc: "Create consistent, high-impact brand visuals with KS Digital's graphic design services for digital campaigns, social media, websites and marketing.",
      order: 6,
    },
    {
      title: "Digital Marketing",
      slug: "digital-marketing",
      summary: "Integrated multi-channel digital strategies unifying SEO, paid media, content, and analytics for maximum business scale.",
      content: "An end-to-end digital growth partnership designed for ambitious businesses. We align every acquisition channel into a synchronized engine, ensuring your budget flows where it generates the highest lifetime customer value.",
      icon: "Globe",
      features: [
        "Full-Funnel Growth Strategy",
        "Cross-Channel Budget Allocation",
        "Unified Performance Reporting & Analytics",
        "Customer Journey & Conversion Optimization",
        "Dedicated Growth Advisory",
      ],
      seoTitle: "Digital Marketing Agency | KS Digital",
      seoDesc: "KS Digital provides integrated digital marketing services across SEO, PPC, social media, web design, automation and content to help businesses grow.",
      order: 7,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  console.log("✅ Services seeded");

  // 6. Pricing Plans
  const plans = [
    {
      name: "Basic Plan",
      price: "₹10,000",
      billingNote: "/month",
      description: "Essential digital marketing solutions to build a strong online presence.",
      bestFor: "Businesses starting with SEO and social media activity.",
      features: [
        "Local SEO & Audits",
        "3 Social Media Channels",
        "Weekly Content Posts",
        "Basic Monthly Report",
        "Standard Email Support",
      ],
      highlighted: false,
      ctaText: "Request Basic",
      ctaLink: "/contact-us/?plan=basic",
      order: 1,
    },
    {
      name: "Professional Plan",
      price: "₹15,000",
      billingNote: "/month",
      description: "Advanced strategies and optimization for growing and scaling businesses.",
      bestFor: "Businesses combining SEO, social, paid media, and automation.",
      features: [
        "Advanced SEO & Google Web Stories",
        "5 Social Media Channels",
        "Multi-platform PPC Campaigns",
        "Marketing Automation & CRM",
        "Dedicated Account Manager",
      ],
      highlighted: true,
      ctaText: "Request Professional",
      ctaLink: "/contact-us/?plan=professional",
      order: 2,
    },
    {
      name: "Exclusive Plan",
      price: "₹20,000",
      billingNote: "/month",
      description: "Full-scale campaigns with premium support for ambitious, fast-growing brands.",
      bestFor: "Businesses seeking wider channel coverage and additional content activity.",
      features: [
        "All Professional Features",
        "8 Social Media Channels",
        "Daily Content & Reels",
        "Influencer Outreach",
        "Priority Slack & Phone Support",
      ],
      highlighted: false,
      ctaText: "Request Exclusive",
      ctaLink: "/contact-us/?plan=exclusive",
      order: 3,
    },
    {
      name: "Enterprise Plan",
      price: "Custom",
      billingNote: " Pricing",
      description: "Bespoke, full-service digital marketing for brands ready to dominate their market.",
      bestFor: "Organisations that need a custom scope and channel mix.",
      features: [
        "Omnichannel Custom Strategy",
        "Unlimited Channels & Posts",
        "Custom Marketing Funnels",
        "High-impact Graphic Branding",
        "24/7 Phone & Slack Support",
      ],
      highlighted: false,
      ctaText: "Request Custom",
      ctaLink: "/contact-us/?plan=enterprise",
      order: 4,
    },
  ];

  for (const p of plans) {
    const existing = await prisma.pricingPlan.findFirst({ where: { name: p.name } });
    if (existing) {
      await prisma.pricingPlan.update({ where: { id: existing.id }, data: p });
    } else {
      await prisma.pricingPlan.create({ data: p });
    }
  }
  console.log("✅ Pricing plans seeded");

  // 7. FAQs
  const faqs = [
    {
      question: "What is digital marketing?",
      answer: "Digital marketing is the strategic promotion of brands, products, or services using digital channels and technologies. It spans a wide range of platforms including smartphones, laptops, search engines, social media, email, and websites.",
      page: "home",
      order: 1,
    },
    {
      question: "What is the difference between digital marketing and digital advertising?",
      answer: "Digital marketing is the broad, overarching strategy that focuses on building brand awareness and nurturing customer relationships. Digital advertising is a specific paid subset—such as Google PPC, programmatic display, or social media ads—designed to achieve direct actions like leads and sales.",
      page: "home",
      order: 2,
    },
    {
      question: "How does digital marketing work?",
      answer: "Digital marketing works by leveraging digital channels to deliver targeted messages to specific audiences based on search patterns, user behavior, and interest signals, then continuously optimizing budgets toward top-performing channels.",
      page: "home",
      order: 3,
    },
    {
      question: "How can digital marketing help my business?",
      answer: "Digital marketing helps your business reach a qualified audience with measurable attribution. You can track every click, conversion, and dollar invested, enabling rapid scaling and predictable customer acquisition.",
      page: "home",
      order: 4,
    },
    {
      question: "What is the minimum commitment period?",
      answer: "KS Digital plans are available monthly with a recommended minimum of 3 months to see measurable growth results. We are happy to discuss a commitment structure tailored to your business goals.",
      page: "pricing",
      order: 1,
    },
    {
      question: "Does the plan price include ad spend?",
      answer: "No. Our plan fees cover agency management, strategy, creative, and execution. Your advertising budget (Google Ads, Meta Ads, DV360) is paid directly to advertising networks and managed transparently on your behalf.",
      page: "pricing",
      order: 2,
    },
    {
      question: "What reports and updates do I receive?",
      answer: "All plans include monthly performance reports covering key metrics for every active channel. Professional and Exclusive plans include a dedicated account manager and regular strategy review calls.",
      page: "pricing",
      order: 3,
    },
  ];

  for (const f of faqs) {
    const existing = await prisma.faq.findFirst({ where: { question: f.question, page: f.page } });
    if (!existing) {
      await prisma.faq.create({ data: f });
    }
  }
  console.log("✅ FAQs seeded");

  console.log("🎉 Seed finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
