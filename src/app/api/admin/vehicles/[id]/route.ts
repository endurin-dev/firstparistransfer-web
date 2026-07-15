import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  try {
    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        name: body.name,
        type: body.type,
        passengers: Number(body.passengers),
        luggage: Number(body.luggage),
        basePrice: Number(body.basePrice),
        image: body.image,
        active: body.active,
      },
    });
    return NextResponse.json(vehicle);
  } catch (err) {
    console.error("Failed to update vehicle:", err);
    return NextResponse.json({ error: "Failed to update vehicle" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await prisma.vehicle.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete vehicle:", err);
    return NextResponse.json({ error: "Failed to delete vehicle" }, { status: 500 });
  }
}