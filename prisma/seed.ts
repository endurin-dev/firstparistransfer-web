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
    { name: "CDG Airport", category: "Airports" },
    { name: "Orly Airport", category: "Airports" },
    { name: "Beauvais Airport", category: "Airports" },
    { name: "Eiffel Tower", category: "Landmarks" },
    { name: "Louvre Museum", category: "Landmarks" },
    { name: "Notre-Dame", category: "Landmarks" },
    { name: "Champs-Élysées", category: "Landmarks" },
    { name: "Ritz Paris", category: "Hotels" },
    { name: "Four Seasons George V", category: "Hotels" },
    { name: "Le Meurice", category: "Hotels" },
    { name: "Shangri-La Paris", category: "Hotels" },
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

  console.log("Seed complete. Now go to /admin/rates to set route prices.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });