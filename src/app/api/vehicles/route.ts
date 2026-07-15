import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/vehicles - active vehicles (used by booking page step 2)
export async function GET() {
  const vehicles = await prisma.vehicle.findMany({
    where: { active: true },
    orderBy: { basePrice: "asc" },
  });
  return NextResponse.json(vehicles);
}
