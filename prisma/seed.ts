import path from "node:path";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), ".env.local"), override: true });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const locations = [
    // Airports
    { name: "CDG Airport", category: "Airports" },
    { name: "Orly Airport", category: "Airports" },
    { name: "Beauvais Airport", category: "Airports" },
    { name: "Le Bourget Airport", category: "Airports" },

    // Train Stations
    { name: "Gare du Nord", category: "Train Stations" },
    { name: "Gare de Lyon", category: "Train Stations" },
    { name: "Gare Montparnasse", category: "Train Stations" },
    { name: "Gare de l'Est", category: "Train Stations" },
    { name: "Gare Saint-Lazare", category: "Train Stations" },
    { name: "Gare d'Austerlitz", category: "Train Stations" },

    // Landmarks
    { name: "Eiffel Tower", category: "Landmarks" },
    { name: "Louvre Museum", category: "Landmarks" },
    { name: "Notre-Dame", category: "Landmarks" },
    { name: "Champs-Élysées", category: "Landmarks" },
    { name: "Arc de Triomphe", category: "Landmarks" },
    { name: "Sacré-Cœur / Montmartre", category: "Landmarks" },
    { name: "Palace of Versailles", category: "Landmarks" },
    { name: "Musée d'Orsay", category: "Landmarks" },
    { name: "Panthéon", category: "Landmarks" },
    { name: "Place de la Concorde", category: "Landmarks" },
    { name: "Disneyland Paris", category: "Landmarks" },

    // Hotels
    { name: "Ritz Paris", category: "Hotels" },
    { name: "Four Seasons George V", category: "Hotels" },
    { name: "Le Meurice", category: "Hotels" },
    { name: "Shangri-La Paris", category: "Hotels" },
    { name: "Hôtel Plaza Athénée", category: "Hotels" },
    { name: "Mandarin Oriental Paris", category: "Hotels" },
    { name: "Le Bristol Paris", category: "Hotels" },
    { name: "Peninsula Paris", category: "Hotels" },
    { name: "Hôtel de Crillon", category: "Hotels" },
    { name: "Park Hyatt Paris-Vendôme", category: "Hotels" },

    // Business Districts
    { name: "La Défense", category: "Business Districts" },
    { name: "Opéra / Grands Boulevards", category: "Business Districts" },
  ];

  for (const loc of locations) {
    await prisma.location.upsert({
      where: { name_category: { name: loc.name, category: loc.category } },
      update: {},
      create: loc,
    });
  }

  const vehicles = [
    { name: "Mercedes S-Class", type: "Luxury Sedan", passengers: 3, luggage: 2, basePrice: 120, image: "/fleet/s-class.webp" },
    { name: "Mercedes E-Class", type: "Executive Sedan", passengers: 4, luggage: 3, basePrice: 100, image: "/fleet/sprinter.webp" },
    { name: "Mercedes V-Class", type: "Luxury Minivan", passengers: 7, luggage: 7, basePrice: 200, image: "/fleet/s-class.webp" },
    { name: "Tesla Model X", type: "Electric SUV", passengers: 5, luggage: 4, basePrice: 180, image: "/fleet/tesla-x.webp" },
  ];

  for (const v of vehicles) {
    const existing = await prisma.vehicle.findFirst({ where: { name: v.name } });
    if (!existing) {
      await prisma.vehicle.create({ data: v });
    }
  }

  // ── Rates ────────────────────────────────────────────────────────
  // PLACEHOLDER PRICES — these are illustrative only. Review and adjust
  // every value below to match your actual fares before relying on this
  // in production. Prices are per vehicle per route (fromLocation → toLocation).
  //
  // Structure: [fromName, toName, { vehicleName: price, ... }]
  const rateRoutes: [string, string, Record<string, number>][] = [
    [
      "CDG Airport",
      "Eiffel Tower",
      { "Mercedes S-Class": 130, "Mercedes E-Class": 110, "Mercedes V-Class": 210, "Tesla Model X": 190 },
    ],
    [
      "CDG Airport",
      "Ritz Paris",
      { "Mercedes S-Class": 135, "Mercedes E-Class": 115, "Mercedes V-Class": 215, "Tesla Model X": 195 },
    ],
    [
      "CDG Airport",
      "Four Seasons George V",
      { "Mercedes S-Class": 135, "Mercedes E-Class": 115, "Mercedes V-Class": 215, "Tesla Model X": 195 },
    ],
    [
      "Orly Airport",
      "Eiffel Tower",
      { "Mercedes S-Class": 110, "Mercedes E-Class": 90, "Mercedes V-Class": 190, "Tesla Model X": 170 },
    ],
    [
      "Orly Airport",
      "Ritz Paris",
      { "Mercedes S-Class": 115, "Mercedes E-Class": 95, "Mercedes V-Class": 195, "Tesla Model X": 175 },
    ],
    [
      "Beauvais Airport",
      "Eiffel Tower",
      { "Mercedes S-Class": 220, "Mercedes E-Class": 190, "Mercedes V-Class": 320, "Tesla Model X": 290 },
    ],
    [
      "Gare du Nord",
      "Eiffel Tower",
      { "Mercedes S-Class": 80, "Mercedes E-Class": 65, "Mercedes V-Class": 140, "Tesla Model X": 125 },
    ],
    [
      "CDG Airport",
      "Disneyland Paris",
      { "Mercedes S-Class": 120, "Mercedes E-Class": 100, "Mercedes V-Class": 200, "Tesla Model X": 180 },
    ],
  ];

  const allLocations = await prisma.location.findMany();
  const allVehicles = await prisma.vehicle.findMany();

  const findLocationId = (name: string) => allLocations.find((l) => l.name === name)?.id;
  const findVehicleId = (name: string) => allVehicles.find((v) => v.name === name)?.id;

  for (const [fromName, toName, prices] of rateRoutes) {
    const fromLocationId = findLocationId(fromName);
    const toLocationId = findLocationId(toName);

    if (!fromLocationId || !toLocationId) {
      console.warn(`Skipping rate: could not find location "${fromName}" or "${toName}"`);
      continue;
    }

    for (const [vehicleName, price] of Object.entries(prices)) {
      const vehicleId = findVehicleId(vehicleName);
      if (!vehicleId) {
        console.warn(`Skipping rate: could not find vehicle "${vehicleName}"`);
        continue;
      }

      await prisma.rate.upsert({
        where: {
          fromLocationId_toLocationId_vehicleId: {
            fromLocationId,
            toLocationId,
            vehicleId,
          },
        },
        update: { price },
        create: { fromLocationId, toLocationId, vehicleId, price },
      });
    }
  }

  console.log("Seed complete.");
  console.log(`Locations: ${locations.length}, Vehicles: ${vehicles.length}, Rate routes: ${rateRoutes.length}`);
  console.log("Review /admin/rates to add pricing for any remaining routes not covered above.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });