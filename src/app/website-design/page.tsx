import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageView from "@/components/ServicePageView";
import { getServiceBySlug, getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Website Design & Development Services | KS Digital",
  description:
    "Build a fast, conversion-focused website with KS Digital. Get modern website design, responsive UX, SEO-ready structure and business-focused landing pages.",
  alternates: {
    canonical: "https://ksdigital.co.in/website-design/",
  },
};

export default async function WebsiteDesignPage() {
  const service = await getServiceBySlug("website-design");
  if (!service) notFound();

  const allServices = await getServices();
  const related = allServices.filter((s) => s.slug !== "website-design").slice(0, 2);

  return <ServicePageView service={service} relatedServices={related} />;
}
