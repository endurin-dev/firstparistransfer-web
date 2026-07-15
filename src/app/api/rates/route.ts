import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/rates?from=CDG Airport&to=Ritz Paris
// Returns price per vehicle for that route. Falls back to vehicle.basePrice
// if no specific route rate has been set in the admin panel yet.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const vehicles = await prisma.vehicle.findMany({ where: { active: true } });

  if (!from || !to) {
    return NextResponse.json(
      vehicles.map((v) => ({ vehicleId: v.id, price: v.basePrice, isRoutePrice: false }))
    );
  }

  const fromLoc = await prisma.location.findFirst({ where: { name: from } });
  const toLoc = await prisma.location.findFirst({ where: { name: to } });

  if (!fromLoc || !toLoc) {
    return NextResponse.json(
      vehicles.map((v) => ({ vehicleId: v.id, price: v.basePrice, isRoutePrice: false }))
    );
  }

  const rates = await prisma.rate.findMany({
    where: { fromLocationId: fromLoc.id, toLocationId: toLoc.id },
  });

  const result = vehicles.map((v) => {
    const rate = rates.find((r) => r.vehicleId === v.id);
    return {
      vehicleId: v.id,
      price: rate ? rate.price : v.basePrice,
      isRoutePrice: !!rate,
    };
  });

  return NextResponse.json(result);
}
