import { Oswald, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { prisma } from "@/lib/prisma";
import RatesBoard from "./rates-board";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-mono",
});

export const revalidate = 300; // re-fetch fares at most every 5 minutes

export default async function RatesPage() {
  const [rateRows, vehicleRows] = await Promise.all([
    prisma.rate.findMany({
      where: {
        fromLocation: { active: true },
        toLocation: { active: true },
        vehicle: { active: true },
      },
      include: { fromLocation: true, toLocation: true, vehicle: true },
      orderBy: [
        { fromLocation: { name: "asc" } },
        { toLocation: { name: "asc" } },
      ],
    }),
    prisma.vehicle.findMany({
      where: { active: true },
      orderBy: { basePrice: "asc" },
    }),
  ]);

  type RouteEntry = {
    fromLocation: { name: string; category: string };
    toLocation: { name: string; category: string };
    prices: Record<string, number>;
  };

  const routeMap = new Map<string, RouteEntry>();

  for (const r of rateRows) {
    const key = `${r.fromLocationId}__${r.toLocationId}`;
    const existing = routeMap.get(key);
    if (existing) {
      existing.prices[r.vehicleId] = r.price;
    } else {
      routeMap.set(key, {
        fromLocation: { name: r.fromLocation.name, category: r.fromLocation.category },
        toLocation: { name: r.toLocation.name, category: r.toLocation.category },
        prices: { [r.vehicleId]: r.price },
      });
    }
  }

  const routes = Array.from(routeMap.values());

  const lastUpdated = rateRows.length
    ? rateRows
        .reduce((latest, r) => (r.updatedAt > latest ? r.updatedAt : latest), rateRows[0].updatedAt)
        .toISOString()
    : null;

  const vehicles = vehicleRows.map((v) => ({
    id: v.id,
    name: v.name,
    passengers: v.passengers,
    luggage: v.luggage,
  }));

  return (
    <div className={`${oswald.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <RatesBoard routes={routes} vehicles={vehicles} lastUpdated={lastUpdated} />
    </div>
  );
}