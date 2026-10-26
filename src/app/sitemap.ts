import { MetadataRoute } from "next";
import { getServices, getBlogPosts } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ksdigital.co.in";

  // Core static pages
  const staticRoutes = [
    "",
    "/about-us",
    "/services",
    "/pricing",
    "/contact-us",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Service routes
  const services = await getServices();
  const serviceRoutes = services.map((s) => ({
    url: `${baseUrl}/${s.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Blog routes
  const posts = await getBlogPosts();
  const blogRoutes = posts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}/`,
    lastModified: p.publishedAt || new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
