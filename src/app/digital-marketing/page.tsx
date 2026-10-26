import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageView from "@/components/ServicePageView";
import { getServiceBySlug, getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Digital Marketing Agency | KS Digital",
  description:
    "KS Digital provides integrated digital marketing services across SEO, PPC, social media, web design, automation and content to help businesses grow.",
  alternates: {
    canonical: "https://ksdigital.co.in/digital-marketing/",
  },
};

export default async function DigitalMarketingPage() {
  const service = await getServiceBySlug("digital-marketing");
  if (!service) notFound();

  const allServices = await getServices();
  const related = allServices.filter((s) => s.slug !== "digital-marketing").slice(0, 2);

  return <ServicePageView service={service} relatedServices={related} />;
}
