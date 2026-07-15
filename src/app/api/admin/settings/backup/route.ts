import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [users, locations, vehicles, rates, bookings] = await Promise.all([
    prisma.user.findMany(),
    prisma.location.findMany(),
    prisma.vehicle.findMany(),
    prisma.rate.findMany(),
    prisma.booking.findMany(),
  ]);

  const backup = {
    exportedAt: new Date().toISOString(),
    version: 1,
    data: { users, locations, vehicles, rates, bookings },
  };

  return new NextResponse(JSON.stringify(backup, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="first-paris-transfer-backup-${new Date()
        .toISOString()
        .slice(0, 10)}.json"`,
    },
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON file" }, { status: 400 });
  }

  const data = body?.data;
  const tablesValid =
    data &&
    Array.isArray(data.users) &&
    Array.isArray(data.locations) &&
    Array.isArray(data.vehicles) &&
    Array.isArray(data.rates) &&
    Array.isArray(data.bookings);

  if (!tablesValid) {
    return NextResponse.json(
      { error: "Backup file is malformed or missing required tables" },
      { status: 400 }
    );
  }

  try {
    await prisma.$transaction(async (tx) => {
      // Delete children before parents to satisfy foreign key constraints
      await tx.rate.deleteMany();
      await tx.booking.deleteMany();
      await tx.vehicle.deleteMany();
      await tx.location.deleteMany();
      await tx.user.deleteMany();

      // Recreate parents before children
      if (data.users.length) await tx.user.createMany({ data: data.users });
      if (data.locations.length) await tx.location.createMany({ data: data.locations });
      if (data.vehicles.length) await tx.vehicle.createMany({ data: data.vehicles });
      if (data.rates.length) await tx.rate.createMany({ data: data.rates });
      if (data.bookings.length) await tx.booking.createMany({ data: data.bookings });
    });
  } catch (err) {
    console.error("Restore failed:", err);
    return NextResponse.json(
      { error: "Restore failed and was rolled back. No data was changed." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}