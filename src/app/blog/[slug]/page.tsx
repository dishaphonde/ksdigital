import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | KS Digital Blog`,
    description: post.excerpt || "Read this article on the KS Digital agency blog.",
    alternates: {
      canonical: `https://ksdigital.co.in/blog/${post.slug}/`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        url: `https://ksdigital.co.in/blog/${post.slug}/`,
        datePublished: post.publishedAt?.toISOString(),
        author: {
          "@type": "Person",
          name: post.authorName,
          jobTitle: post.authorRole,
        },
        publisher: {
          "@type": "Organization",
          name: "KS Digital",
          url: "https://ksdigital.co.in/",
        },
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
            name: "Blog",
            item: "https://ksdigital.co.in/blog/",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `https://ksdigital.co.in/blog/${post.slug}/`,
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

      <article className="pt-12 pb-24 md:pt-20 md:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted hover:text-brand-blue transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Insights
            </Link>
          </div>

          {/* Article Header */}
          <header className="space-y-6 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
              {post.category}
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-muted pt-2 border-y border-white/10 py-4">
              <span className="flex items-center gap-1.5 font-medium text-foreground">
                <User className="w-4 h-4 text-brand-blue" /> {post.authorName}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted">{post.authorRole}</span>
              <span className="text-muted-foreground">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-blue" /> {post.readTime}
              </span>
            </div>
          </header>

          {/* Article Body */}
          <div className="glass-card p-8 sm:p-12 mb-12">
            <div className="prose prose-invert max-w-none text-muted text-base sm:text-lg leading-relaxed space-y-6">
              <p className="text-foreground font-medium text-xl leading-relaxed">
                {post.excerpt}
              </p>
              <div className="w-12 h-0.5 bg-brand-blue/50 my-6" />
              <p>{post.content}</p>
              <p>
                When implementing these strategies, consistency and attribution rigor remain paramount. Regularly audits of conversion tracking tags, landing page load times, and audience decay ensure your performance trajectory stays sustainable.
              </p>
            </div>
          </div>

          {/* Author Box */}
          <div className="glass-card p-6 sm:p-8 flex items-center justify-between border-brand-blue/30">
            <div>
              <p className="text-xs uppercase tracking-wider text-brand-blue font-semibold mb-1">
                Written by
              </p>
              <h3 className="font-heading text-xl font-bold text-foreground">
                {post.authorName}
              </h3>
              <p className="text-sm text-muted">{post.authorRole} at KS Digital</p>
            </div>
            <Link href="/about-us" className="btn-secondary text-xs">
              View Team Profile
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
