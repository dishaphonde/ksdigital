"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { verifySession, clearSessionCookie } from "@/lib/auth";

// Helper: Require authentication
async function requireAuth(allowedRoles: ("SUPER_ADMIN" | "EDITOR" | "SALES")[] = ["SUPER_ADMIN", "EDITOR", "SALES"]) {
  const session = await verifySession();
  if (!session) {
    redirect("/admin");
  }
  if (!allowedRoles.includes(session.role)) {
    throw new Error("Unauthorized: Insufficient role permissions.");
  }
  return session;
}

// ─── AUTH ACTIONS ───
export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  redirect("/admin");
}

// ─── TEAM ACTIONS ───
export async function saveTeamMemberAction(formData: FormData): Promise<void> {
  await requireAuth(["SUPER_ADMIN", "EDITOR"]);

  const id = formData.get("id") as string | null;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const slug = (formData.get("slug") as string) || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const bio = formData.get("bio") as string;
  const shortBio = (formData.get("shortBio") as string) || null;
  const initials = (formData.get("initials") as string) || name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const photo = (formData.get("photo") as string) || null;
  const linkedinUrl = (formData.get("linkedinUrl") as string) || null;
  const email = (formData.get("email") as string) || null;
  const visible = formData.get("visible") === "true";
  const order = parseInt((formData.get("order") as string) || "0", 10);

  try {
    if (id && id !== "new") {
      await prisma.teamMember.update({
        where: { id },
        data: { name, role, slug, bio, shortBio, initials, photo, linkedinUrl, email, visible, order },
      });
    } else {
      await prisma.teamMember.create({
        data: { name, role, slug, bio, shortBio, initials, photo, linkedinUrl, email, visible, order },
      });
    }
  } catch (err) {
    console.error("Failed to save team member:", err);
  }

  revalidatePath("/about-us");
  revalidatePath("/");
  revalidatePath("/admin/team");
}

export async function deleteTeamMemberAction(id: string): Promise<void> {
  await requireAuth(["SUPER_ADMIN"]);
  try {
    await prisma.teamMember.delete({ where: { id } });
  } catch (err) {
    console.error("Failed to delete team member:", err);
  }
  revalidatePath("/about-us");
  revalidatePath("/");
  revalidatePath("/admin/team");
}

// ─── PRICING ACTIONS ───
export async function savePricingPlanAction(formData: FormData): Promise<void> {
  await requireAuth(["SUPER_ADMIN", "EDITOR"]);

  const id = formData.get("id") as string | null;
  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const billingNote = (formData.get("billingNote") as string) || null;
  const description = (formData.get("description") as string) || null;
  const bestFor = (formData.get("bestFor") as string) || null;
  const highlighted = formData.get("highlighted") === "true";
  const featuresRaw = formData.get("features") as string;
  const features = featuresRaw ? featuresRaw.split("\n").map(f => f.trim()).filter(Boolean) : [];
  const ctaText = (formData.get("ctaText") as string) || "Request Plan";
  const ctaLink = (formData.get("ctaLink") as string) || "/contact-us/";
  const order = parseInt((formData.get("order") as string) || "0", 10);

  try {
    if (id && id !== "new") {
      await prisma.pricingPlan.update({
        where: { id },
        data: { name, price, billingNote, description, bestFor, highlighted, features, ctaText, ctaLink, order },
      });
    } else {
      await prisma.pricingPlan.create({
        data: { name, price, billingNote, description, bestFor, highlighted, features, ctaText, ctaLink, order },
      });
    }
  } catch (err) {
    console.error("Failed to save pricing plan:", err);
  }

  revalidatePath("/pricing");
  revalidatePath("/admin/pricing");
}

// ─── SERVICE ACTIONS ───
export async function saveServiceAction(formData: FormData): Promise<void> {
  await requireAuth(["SUPER_ADMIN", "EDITOR"]);

  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const summary = formData.get("summary") as string;
  const content = formData.get("content") as string;
  const icon = (formData.get("icon") as string) || "TrendingUp";
  const featuresRaw = formData.get("features") as string;
  const features = featuresRaw ? featuresRaw.split("\n").map(f => f.trim()).filter(Boolean) : [];
  const visible = formData.get("visible") === "true";
  const order = parseInt((formData.get("order") as string) || "0", 10);

  try {
    if (id && id !== "new") {
      await prisma.service.update({
        where: { id },
        data: { title, slug, summary, content, icon, features, visible, order },
      });
    } else {
      await prisma.service.create({
        data: { title, slug, summary, content, icon, features, visible, order },
      });
    }
  } catch (err) {
    console.error("Failed to save service:", err);
  }

  revalidatePath("/services");
  revalidatePath(`/${slug}`);
  revalidatePath("/admin/services");
}

// ─── SETTINGS ACTIONS ───
export async function saveSiteSettingsAction(formData: FormData): Promise<void> {
  await requireAuth(["SUPER_ADMIN", "EDITOR"]);

  const businessName = formData.get("businessName") as string;
  const phone = formData.get("phone") as string;
  const whatsappNumber = formData.get("whatsappNumber") as string;
  const email = formData.get("email") as string;
  const instagramUrl = (formData.get("instagramUrl") as string) || null;
  const linkedinUrl = (formData.get("linkedinUrl") as string) || null;
  const footerText = (formData.get("footerText") as string) || null;

  try {
    await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: { businessName, phone, whatsappNumber, email, instagramUrl, linkedinUrl, footerText },
      create: { id: "default", businessName, phone, whatsappNumber, email, instagramUrl, linkedinUrl, footerText },
    });
  } catch (err) {
    console.error("Failed to save site settings:", err);
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
}

// ─── CRM LEAD ACTIONS ───
export async function updateLeadStatusAction(
  leadId: string,
  status: "NEW" | "CONTACTED" | "QUALIFIED" | "PROPOSAL_SENT" | "WON" | "LOST"
): Promise<void> {
  await requireAuth(["SUPER_ADMIN", "SALES"]);

  try {
    await prisma.lead.update({
      where: { id: leadId },
      data: { status },
    });
  } catch (err) {
    console.error("Failed to update lead status:", err);
  }

  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${leadId}`);
}

export async function addLeadNoteAction(leadId: string, content: string): Promise<void> {
  const session = await requireAuth(["SUPER_ADMIN", "SALES"]);

  try {
    await prisma.leadNote.create({
      data: {
        leadId,
        authorId: session.userId === "admin-root" ? (await prisma.user.findFirst())?.id || "root" : session.userId,
        content,
      },
    });
  } catch (err) {
    console.error("Failed to add lead note:", err);
  }

  revalidatePath(`/admin/leads/${leadId}`);
}
