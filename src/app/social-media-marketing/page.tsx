import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageView from "@/components/ServicePageView";
import { getServiceBySlug, getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Social Media Marketing Services | KS Digital",
  description:
    "Build reach, engagement and leads with social media marketing from KS Digital. Strategy, content, creative, publishing and performance optimization.",
  alternates: {
    canonical: "https://ksdigital.co.in/social-media-marketing/",
  },
};

export default async function SocialMediaMarketingPage() {
  const service = await getServiceBySlug("social-media-marketing");
  if (!service) notFound();

  const allServices = await getServices();
  const related = allServices.filter((s) => s.slug !== "social-media-marketing").slice(0, 2);

  return <ServicePageView service={service} relatedServices={related} />;
}
