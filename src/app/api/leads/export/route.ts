import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";

export async function GET() {
  const session = await verifySession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Generate CSV content
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Company",
      "Service Interested",
      "Budget",
      "Status",
      "Source Page",
      "UTM Source",
      "Created At",
      "Message",
    ];

    const rows = leads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${(l.phone || "").replace(/"/g, '""')}"`,
      `"${(l.company || "").replace(/"/g, '""')}"`,
      `"${(l.serviceInterest || "").replace(/"/g, '""')}"`,
      `"${(l.budget || "").replace(/"/g, '""')}"`,
      l.status,
      `"${(l.sourcePage || "").replace(/"/g, '""')}"`,
      `"${(l.utmSource || "").replace(/"/g, '""')}"`,
      l.createdAt.toISOString(),
      `"${(l.message || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="ks-digital-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    console.error("CSV export error:", error);
    return new NextResponse("Failed to export leads", { status: 500 });
  }
}
