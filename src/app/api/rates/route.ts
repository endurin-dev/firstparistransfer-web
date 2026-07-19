import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/rates?fromLocationId=&toLocationId= - public read-only lookup
// used by the booking page to price a selected route.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fromLocationId = searchParams.get("fromLocationId");
  const toLocationId = searchParams.get("toLocationId");

  if (!fromLocationId || !toLocationId) {
    return NextResponse.json([]);
  }

  const rates = await prisma.rate.findMany({
    where: { fromLocationId, toLocationId },
  });
  return NextResponse.json(rates);
}