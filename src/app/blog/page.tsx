import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { getBlogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Digital Marketing Blog & Growth Insights | KS Digital",
  description:
    "Explore actionable guides on SEO, programmatic media buying, conversion optimization and analytics written by the KS Digital team.",
  alternates: {
    canonical: "https://ksdigital.co.in/blog/",
  },
};

export default async function BlogListingPage() {
  const posts = await getBlogPosts();

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 text-center border-b border-white/5 relative bg-white/[0.01]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-blue/10 text-brand-blue border border-brand-blue/20 mb-4">
            Agency Insights
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6">
            Actionable Strategies for <span className="gradient-text">Modern Marketers</span>
          </h1>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Curated analysis, programmatic bidding tactics, technical SEO blueprints, and user experience methodologies from our practitioners.
          </p>
        </div>
      </section>

      {/* ─── Posts Grid ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="glass-card p-8 flex flex-col justify-between group hover:border-brand-blue/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-muted mb-4">
                    <span className="px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue font-semibold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-muted">
                      <BookOpen className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-heading text-2xl font-bold text-foreground mb-3 group-hover:text-brand-blue transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <User className="w-3.5 h-3.5 text-brand-blue" />
                    <span>
                      By <strong className="text-foreground">{post.authorName}</strong>
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-semibold text-brand-blue inline-flex items-center gap-1 group-hover:underline"
                  >
                    Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
