import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageView from "@/components/ServicePageView";
import { getServiceBySlug, getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "SEO Services for Businesses | KS Digital",
  description:
    "Grow qualified organic traffic, rankings and leads with SEO services from KS Digital. Get technical SEO, content, on-page and authority-building support.",
  alternates: {
    canonical: "https://ksdigital.co.in/seo-services/",
  },
};

export default async function SeoServicesPage() {
  const service = await getServiceBySlug("seo-services");
  if (!service) notFound();

  const allServices = await getServices();
  const related = allServices.filter((s) => s.slug !== "seo-services").slice(0, 2);

  return <ServicePageView service={service} relatedServices={related} />;
}
