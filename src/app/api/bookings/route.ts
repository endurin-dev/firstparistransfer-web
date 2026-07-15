import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendBookingEmails } from "@/lib/mail";

// POST /api/bookings - called from the public booking page on "Complete Booking"
export async function POST(req: Request) {
  const body = await req.json();

  const required = ["tripType", "fromText", "toText", "date", "time", "vehicleName", "price", "name", "phone", "email"];
  for (const field of required) {
    if (!body[field] && body[field] !== 0) {
      return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
    }
  }

  const booking = await prisma.booking.create({
    data: {
      tripType: body.tripType,
      fromText: body.fromText,
      toText: body.toText,
      date: new Date(body.date),
      time: body.time,
      vehicleId: body.vehicleId || null,
      vehicleName: body.vehicleName,
      price: Number(body.price),
      name: body.name,
      country: body.country || null,
      phone: body.phone,
      email: body.email,
      note: body.note || null,
    },
  });

  // Send confirmation emails — don't fail the booking if email delivery has an issue
  try {
    await sendBookingEmails({
      bookingId: booking.id,
      tripType: booking.tripType,
      fromText: booking.fromText,
      toText: booking.toText,
      date: booking.date.toISOString(),
      time: booking.time,
      vehicleName: booking.vehicleName,
      price: booking.price,
      name: booking.name,
      country: booking.country,
      phone: booking.phone,
      email: booking.email,
      note: booking.note,
    });
  } catch (err) {
    console.error("Failed to send booking emails:", err);
  }

  return NextResponse.json(booking, { status: 201 });
}