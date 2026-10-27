import { prisma } from "@/lib/db";

// Fallback hardcoded data if database is unseeded or during cold-start build
export const fallbackSiteSettings = {
  id: "default",
  businessName: "KS Digital",
  phone: "+917276503159",
  whatsappNumber: "917276503159",
  email: "sawantketan87@gmail.com",
  instagramUrl: "https://instagram.com/ksdigital.ai",
  linkedinUrl: "https://www.linkedin.com/company/ksdigital-performance/",
  footerText: "Boost Your Online Presence with Digital Marketing Services. Smart Strategies. Scalable Results.",
  announcementBar: null,
  announcementEnabled: false,
};

const teamPhotosBySlug: Record<string, string> = {
  "ketan-sawant": "/images/team/ketan-sawant.jpg",
  "saumil-shah": "/images/team/saumil-shah.jpg",
  "praneeth-yamsani": "/images/team/praneeth-yamsani.jpg",
  "prajwal-thombare": "/images/team/prajwal-thombare.jpg",
};

export const fallbackTeamMembers = [
  {
    id: "team-1",
    name: "Ketan Sawant",
    role: "Founder",
    slug: "ketan-sawant",
    bio: "As a Digital Marketer my skill sets are tuned to build and scale products and organizations, have delivered growth which is needed in startup organization. Adept understanding business end to end user flows while working on strategic & critical bets, handled both topline and bottom-line KPIs for organization. My experience covers Performance Marketing, Affiliate marketing, Team building & handling and operations.",
    shortBio: "Founder & growth strategist with deep expertise in performance marketing, affiliate channels, and startup scaling.",
    initials: "KS",
    photo: teamPhotosBySlug["ketan-sawant"],
    linkedinUrl: "https://www.linkedin.com/in/ketan-sawant-7b5941194/",
    email: "sawantketan87@gmail.com",
    order: 1,
    visible: true,
  },
  {
    id: "team-2",
    name: "Saumil Shah",
    role: "Senior SEO Advisor",
    slug: "saumil-shah",
    bio: "Successfully implemented Performance Marketing and Earned Media Channels. With more than 14+ years of experience in SEO, SMO, YouTube SEO, Google Stories, Google News & ASO. Responsible for the overall direction, coordination, development and evaluation of SEO, SMO and App promotions.",
    shortBio: "14+ years of expertise guiding SEO, Google Stories, Google News, and earned media growth.",
    initials: "SS",
    photo: teamPhotosBySlug["saumil-shah"],
    linkedinUrl: "https://www.linkedin.com/in/saumil-shah/",
    email: null,
    order: 2,
    visible: true,
  },
  {
    id: "team-3",
    name: "Praneeth Yamsani",
    role: "Programmatic Ads Expert",
    slug: "praneeth-yamsani",
    bio: "Results-driven Programmatic Advertising and Performance Marketing Specialist with expertise in DV360, Google marketing platforms. Experienced in managing large-scale acquisition and retention campaigns across Google, Meta, affiliates, display, video, and YouTube with high monthly spends. Strong skills in audience segmentation, KPI, conversion optimization, and performance reporting using data-driven insights.",
    shortBio: "Specialist in DV360, Google Marketing Platform, DSPs, and high-volume acquisition campaigns.",
    initials: "PY",
    photo: teamPhotosBySlug["praneeth-yamsani"],
    linkedinUrl: null,
    email: null,
    order: 3,
    visible: true,
  },
  {
    id: "team-4",
    name: "Prajwal Thombare",
    role: "Sr Web Developer",
    slug: "prajwal-thombare",
    bio: "Creative and detail-oriented Website Designer with a passion for building modern, user-friendly, and high-performing websites. I specialize in designing visually appealing layouts that not only look great but also deliver strong user experiences and business results. Focused on creating clean, responsive, and user-experience-driven websites that help brands grow online.",
    shortBio: "Builds high-performance, conversion-oriented websites engineered for user experience and SEO.",
    initials: "PT",
    photo: teamPhotosBySlug["prajwal-thombare"],
    linkedinUrl: null,
    email: null,
    order: 4,
    visible: true,
  },
  {
    id: "team-5",
    name: "Tanisha Shah",
    role: "Chief Finance Officer (CFO)",
    slug: "tanisha-shah",
    bio: "Chief Finance Officer, KS Digital. Leads financial planning, resource allocation, and operational budgeting to support sustainable digital agency expansion.",
    shortBio: "Chief Finance Officer, KS Digital.",
    initials: "TS",
    photo: null,
    linkedinUrl: null,
    email: null,
    order: 5,
    visible: true,
  },
];

export const fallbackServices = [
  {
    id: "srv-1",
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
    visible: true,
  },
  {
    id: "srv-2",
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
    visible: true,
  },
  {
    id: "srv-3",
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
    visible: true,
  },
  {
    id: "srv-4",
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
    visible: true,
  },
  {
    id: "srv-5",
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
    visible: true,
  },
  {
    id: "srv-6",
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
    visible: true,
  },
  {
    id: "srv-7",
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
    visible: true,
  },
];

export const fallbackPricingPlans = [
  {
    id: "plan-1",
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
    visible: true,
  },
  {
    id: "plan-2",
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
    visible: true,
  },
  {
    id: "plan-3",
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
    visible: true,
  },
  {
    id: "plan-4",
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
    visible: true,
  },
];

export const fallbackFaqs = [
  {
    id: "faq-1",
    question: "What is digital marketing?",
    answer: "Digital marketing is the strategic promotion of brands, products, or services using digital channels and technologies. It spans a wide range of platforms including smartphones, laptops, search engines, social media, email, and websites.",
    page: "home",
    order: 1,
    visible: true,
  },
  {
    id: "faq-2",
    question: "What is the difference between digital marketing and digital advertising?",
    answer: "Digital marketing is the broad, overarching strategy that focuses on building brand awareness and nurturing customer relationships. Digital advertising is a specific paid subset—such as Google PPC, programmatic display, or social media ads—designed to achieve direct actions like leads and sales.",
    page: "home",
    order: 2,
    visible: true,
  },
  {
    id: "faq-3",
    question: "How does digital marketing work?",
    answer: "Digital marketing works by leveraging digital channels to deliver targeted messages to specific audiences based on search patterns, user behavior, and interest signals, then continuously optimizing budgets toward top-performing channels.",
    page: "home",
    order: 3,
    visible: true,
  },
  {
    id: "faq-4",
    question: "How can digital marketing help my business?",
    answer: "Digital marketing helps your business reach a qualified audience with measurable attribution. You can track every click, conversion, and dollar invested, enabling rapid scaling and predictable customer acquisition.",
    page: "home",
    order: 4,
    visible: true,
  },
  {
    id: "faq-5",
    question: "What is the minimum commitment period?",
    answer: "KS Digital plans are available monthly with a recommended minimum of 3 months to see measurable growth results. We are happy to discuss a commitment structure tailored to your business goals.",
    page: "pricing",
    order: 1,
    visible: true,
  },
  {
    id: "faq-6",
    question: "Does the plan price include ad spend?",
    answer: "No. Our plan fees cover agency management, strategy, creative, and execution. Your advertising budget (Google Ads, Meta Ads, DV360) is paid directly to advertising networks and managed transparently on your behalf.",
    page: "pricing",
    order: 2,
    visible: true,
  },
  {
    id: "faq-7",
    question: "What reports and updates do I receive?",
    answer: "All plans include monthly performance reports covering key metrics for every active channel. Professional and Exclusive plans include a dedicated account manager and regular strategy review calls.",
    page: "pricing",
    order: 3,
    visible: true,
  },
];

export const fallbackBlogPosts = [
  {
    id: "post-1",
    title: "Paid Ad Budgets: Scaling Lead Flow in 2026",
    slug: "paid-ad-budgets-scaling-lead-flow-2026",
    excerpt: "Learn how to manage and scale paid media allocations across programmatic networks and search engines without collapsing ROI metrics.",
    content: "Scaling digital advertising budgets requires a structured multi-tier strategy. Instead of aggressively raising bids across top-of-funnel campaigns, top-performing media buyers isolate high-intent search queries and remarketing pools to establish baseline ROAS before expanding programmatic reach.",
    category: "Paid Advertising",
    readTime: "5 min read",
    authorName: "Praneeth Yamsani",
    authorRole: "Programmatic Ads Expert",
    publishedAt: new Date("2026-05-25"),
    status: "PUBLISHED",
  },
  {
    id: "post-2",
    title: "High-Performance SEO: Winning Organic Search Volume",
    slug: "high-performance-seo-winning-organic-volume",
    excerpt: "Discover technical optimization methods, search engine algorithms, and schema structures that yield sustainable customer acquisition.",
    content: "Organic search visibility is no longer just about keyword stuffing or generic backlinks. Modern search algorithms prioritize topical authority clusters, entity schema precision, Core Web Vitals performance, and verifiable author expertise (E-E-A-T).",
    category: "SEO Optimization",
    readTime: "6 min read",
    authorName: "Saumil Shah",
    authorRole: "Senior SEO Advisor",
    publishedAt: new Date("2026-05-22"),
    status: "PUBLISHED",
  },
  {
    id: "post-3",
    title: "Affiliate & Partner Campaigns: Operating Growth KPIs",
    slug: "affiliate-campaigns-operating-growth-kpis",
    excerpt: "How founders and growth marketers structure affiliate partnerships to drive profitable top-line acquisition.",
    content: "Affiliate marketing provides performance-based leverage for growing businesses. Success hinges on clear commission tiers, fraud prevention, rigorous tracking attribution, and deep alignment between creative assets and audience landing page experience.",
    category: "Affiliate Marketing",
    readTime: "4 min read",
    authorName: "Ketan Sawant",
    authorRole: "Founder",
    publishedAt: new Date("2026-05-18"),
    status: "PUBLISHED",
  },
  {
    id: "post-4",
    title: "Landing Page UX Rules: Turning Clicks Into Customers",
    slug: "landing-page-ux-rules-turning-clicks-into-customers",
    excerpt: "Essential design guidelines, contrast rules, and trust elements to dramatically elevate website conversion rates.",
    content: "A high-performing landing page removes friction at every step. Clear value propositions above the fold, fast load times under 1.5 seconds, accessible focus states, and unambiguous single-action forms are foundational to high conversion.",
    category: "Conversion Rate Optimization",
    readTime: "5 min read",
    authorName: "Prajwal Thombare",
    authorRole: "Sr Web Developer",
    publishedAt: new Date("2026-05-14"),
    status: "PUBLISHED",
  },
];

// Helper database fetchers with seamless fallback
export async function getSiteSettings() {
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: "default" } });
    return settings || fallbackSiteSettings;
  } catch {
    return fallbackSiteSettings;
  }
}

export async function getTeamMembers() {
  try {
    const team = await prisma.teamMember.findMany({
      where: { visible: true },
      orderBy: { order: "asc" },
    });
    return (team.length > 0 ? team : fallbackTeamMembers).map((member) => ({
      ...member,
      photo: member.photo ?? teamPhotosBySlug[member.slug] ?? null,
    }));
  } catch {
    return fallbackTeamMembers;
  }
}

export async function getServices() {
  try {
    const services = await prisma.service.findMany({
      where: { visible: true },
      orderBy: { order: "asc" },
    });
    return services.length > 0 ? services : fallbackServices;
  } catch {
    return fallbackServices;
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    const service = await prisma.service.findUnique({ where: { slug } });
    if (service) return service;
  } catch {
    // fallback
  }
  return fallbackServices.find((s) => s.slug === slug) || null;
}

export async function getPricingPlans() {
  try {
    const plans = await prisma.pricingPlan.findMany({
      where: { visible: true },
      orderBy: { order: "asc" },
    });
    return plans.length > 0 ? plans : fallbackPricingPlans;
  } catch {
    return fallbackPricingPlans;
  }
}

export async function getFaqs(page: string = "home") {
  try {
    const faqs = await prisma.faq.findMany({
      where: { page, visible: true },
      orderBy: { order: "asc" },
    });
    return faqs.length > 0 ? faqs : fallbackFaqs.filter((f) => f.page === page);
  } catch {
    return fallbackFaqs.filter((f) => f.page === page);
  }
}

export async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      include: { author: true },
      orderBy: { publishedAt: "desc" },
    });
    if (posts.length > 0) {
      return posts.map((p) => ({
        ...p,
        authorName: p.author?.name || "KS Digital Team",
        authorRole: p.author?.role || "Digital Marketing Specialist",
      }));
    }
  } catch {
    // fallback
  }
  return fallbackBlogPosts;
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: { author: true },
    });
    if (post) {
      return {
        ...post,
        authorName: post.author?.name || "KS Digital Team",
        authorRole: post.author?.role || "Digital Marketing Specialist",
      };
    }
  } catch {
    // fallback
  }
  return fallbackBlogPosts.find((p) => p.slug === slug) || null;
}
