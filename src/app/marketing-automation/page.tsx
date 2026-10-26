import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageView from "@/components/ServicePageView";
import { getServiceBySlug, getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Marketing Automation Services | KS Digital",
  description:
    "Automate lead nurturing, follow-ups and customer journeys with KS Digital's marketing automation services and growth workflows.",
  alternates: {
    canonical: "https://ksdigital.co.in/marketing-automation/",
  },
};

export default async function MarketingAutomationPage() {
  const service = await getServiceBySlug("marketing-automation");
  if (!service) notFound();

  const allServices = await getServices();
  const related = allServices.filter((s) => s.slug !== "marketing-automation").slice(0, 2);

  return <ServicePageView service={service} relatedServices={related} />;
}
