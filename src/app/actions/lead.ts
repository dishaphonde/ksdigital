"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  company: z.string().optional(),
  serviceInterest: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters"),
  sourcePage: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  honeypot: z.string().max(0, "Bot detected"), // must be empty
});

export async function submitLeadAction(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: (formData.get("company") as string) || undefined,
      serviceInterest: (formData.get("serviceInterest") as string) || undefined,
      budget: (formData.get("budget") as string) || undefined,
      message: formData.get("message") as string,
      sourcePage: (formData.get("sourcePage") as string) || "/",
      utmSource: (formData.get("utmSource") as string) || undefined,
      utmMedium: (formData.get("utmMedium") as string) || undefined,
      utmCampaign: (formData.get("utmCampaign") as string) || undefined,
      honeypot: (formData.get("website_url_hp") as string) || "",
    };

    const parsed = leadSchema.safeParse(rawData);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.errors[0]?.message || "Validation failed.",
      };
    }

    const { honeypot, ...leadData } = parsed.data;

    // Save lead to database
    try {
      await prisma.lead.create({
        data: {
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone,
          company: leadData.company,
          serviceInterest: leadData.serviceInterest,
          budget: leadData.budget,
          message: leadData.message,
          sourcePage: leadData.sourcePage,
          utmSource: leadData.utmSource,
          utmMedium: leadData.utmMedium,
          utmCampaign: leadData.utmCampaign,
          status: "NEW",
        },
      });
    } catch (dbError) {
      console.error("Database lead storage error:", dbError);
      // Even if database has connection issues, we proceed to attempt email notification
    }

    // Optional email dispatch via Resend if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.FROM_EMAIL || "onboarding@resend.dev",
            to: process.env.NOTIFICATION_EMAIL || "sawantketan87@gmail.com",
            subject: `🎯 New Lead Inquiry from ${leadData.name}`,
            html: `
              <h2>New Lead Received from KS Digital Website</h2>
              <p><strong>Name:</strong> ${leadData.name}</p>
              <p><strong>Email:</strong> ${leadData.email}</p>
              <p><strong>Phone:</strong> ${leadData.phone}</p>
              <p><strong>Company:</strong> ${leadData.company || "N/A"}</p>
              <p><strong>Service Interested:</strong> ${leadData.serviceInterest || "General Inquiry"}</p>
              <p><strong>Budget:</strong> ${leadData.budget || "N/A"}</p>
              <p><strong>Message:</strong></p>
              <p>${leadData.message}</p>
              <hr />
              <p><small>Source Page: ${leadData.sourcePage}</small></p>
            `,
          }),
        });
        if (!res.ok) {
          console.warn("Resend email dispatch warning:", await res.text());
        }
      } catch (emailErr) {
        console.error("Email notification dispatch error:", emailErr);
      }
    }

    return {
      success: true,
      message: "Thank you! Your message has been received. Our team will contact you shortly.",
    };
  } catch (error) {
    console.error("submitLeadAction exception:", error);
    return {
      success: false,
      error: "Something went wrong while submitting. Please call or WhatsApp us directly at +91 7276503159.",
    };
  }
}
