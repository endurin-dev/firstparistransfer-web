import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/locations - active locations grouped by category (used by booking page)
export async function GET() {
  const locations = await prisma.location.findMany({
    where: { active: true },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  const grouped: Record<string, string[]> = {};
  for (const loc of locations) {
    if (!grouped[loc.category]) grouped[loc.category] = [];
    grouped[loc.category].push(loc.name);
  }

  const result = Object.entries(grouped).map(([category, items]) => ({ category, items }));
  return NextResponse.json(result);
}
