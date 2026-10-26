import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageView from "@/components/ServicePageView";
import { getServiceBySlug, getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Performance Marketing Agency | KS Digital",
  description:
    "Drive measurable leads and sales with performance marketing from KS Digital. Get data-led paid campaigns, conversion optimisation and transparent reporting.",
  alternates: {
    canonical: "https://ksdigital.co.in/performance-marketing/",
  },
};

export default async function PerformanceMarketingPage() {
  const service = await getServiceBySlug("performance-marketing");
  if (!service) notFound();

  const allServices = await getServices();
  const related = allServices.filter((s) => s.slug !== "performance-marketing").slice(0, 2);

  return <ServicePageView service={service} relatedServices={related} />;
}
