import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/rates?fromLocationId=&toLocationId= - list rates, optionally for one route
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fromLocationId = searchParams.get("fromLocationId");
  const toLocationId = searchParams.get("toLocationId");

  const rates = await prisma.rate.findMany({
    where: {
      ...(fromLocationId ? { fromLocationId } : {}),
      ...(toLocationId ? { toLocationId } : {}),
    },
    include: { fromLocation: true, toLocation: true, vehicle: true },
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(rates);
}

// POST /api/admin/rates - bulk upsert prices for a route (one row per vehicle)
// body: { fromLocationId, toLocationId, prices: [{ vehicleId, price }] }
export async function POST(req: Request) {
  const body = await req.json();
  const { fromLocationId, toLocationId, prices } = body;

  if (!fromLocationId || !toLocationId || !Array.isArray(prices)) {
    return NextResponse.json({ error: "fromLocationId, toLocationId and prices[] are required" }, { status: 400 });
  }

  const results = await Promise.all(
    prices.map((p: { vehicleId: string; price: number }) =>
      prisma.rate.upsert({
        where: {
          fromLocationId_toLocationId_vehicleId: {
            fromLocationId,
            toLocationId,
            vehicleId: p.vehicleId,
          },
        },
        update: { price: Number(p.price) },
        create: {
          fromLocationId,
          toLocationId,
          vehicleId: p.vehicleId,
          price: Number(p.price),
        },
      })
    )
  );

  return NextResponse.json(results, { status: 201 });
}
