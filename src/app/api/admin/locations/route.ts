import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const locations = await prisma.location.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });
  return NextResponse.json(locations);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.name || !body.category) {
    return NextResponse.json({ error: "name and category are required" }, { status: 400 });
  }
  const location = await prisma.location.create({
    data: { name: body.name, category: body.category, active: body.active ?? true },
  });
  return NextResponse.json(location, { status: 201 });
}
