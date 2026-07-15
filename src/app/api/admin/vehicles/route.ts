import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const vehicles = await prisma.vehicle.findMany({ orderBy: { basePrice: "asc" } });
  return NextResponse.json(vehicles);
}

export async function POST(req: Request) {
  const body = await req.json();
  const required = ["name", "type", "passengers", "luggage", "basePrice", "image"];
  for (const f of required) {
    if (body[f] === undefined || body[f] === "") {
      return NextResponse.json({ error: `Missing field: ${f}` }, { status: 400 });
    }
  }
  const vehicle = await prisma.vehicle.create({
    data: {
      name: body.name,
      type: body.type,
      passengers: Number(body.passengers),
      luggage: Number(body.luggage),
      basePrice: Number(body.basePrice),
      image: body.image,
      active: body.active ?? true,
    },
  });
  return NextResponse.json(vehicle, { status: 201 });
}
