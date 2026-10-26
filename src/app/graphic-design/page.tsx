import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageView from "@/components/ServicePageView";
import { getServiceBySlug, getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Graphic Design Services for Brands | KS Digital",
  description:
    "Create consistent, high-impact brand visuals with KS Digital's graphic design services for digital campaigns, social media, websites and marketing.",
  alternates: {
    canonical: "https://ksdigital.co.in/graphic-design/",
  },
};

export default async function GraphicDesignPage() {
  const service = await getServiceBySlug("graphic-design");
  if (!service) notFound();

  const allServices = await getServices();
  const related = allServices.filter((s) => s.slug !== "graphic-design").slice(0, 2);

  return <ServicePageView service={service} relatedServices={related} />;
}
