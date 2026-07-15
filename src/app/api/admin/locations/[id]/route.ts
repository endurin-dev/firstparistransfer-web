import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  if (!body.name || !body.category) {
    return NextResponse.json({ error: "name and category are required" }, { status: 400 });
  }

  try {
    const location = await prisma.location.update({
      where: { id },
      data: {
        name: body.name,
        category: body.category,
        active: body.active ?? true,
      },
    });
    return NextResponse.json(location);
  } catch (err) {
    console.error("Failed to update location:", err);
    return NextResponse.json({ error: "Failed to update location" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await prisma.location.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete location:", err);
    return NextResponse.json({ error: "Failed to delete location" }, { status: 500 });
  }
}