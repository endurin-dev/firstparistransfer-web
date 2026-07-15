// One-off script to create/update an admin user.
// Run with: npx tsx prisma/create-admin.ts   (or ts-node)
import path from "node:path";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import readline from "readline";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), ".env.local"), override: true });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function ask(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (answer) => { rl.close(); resolve(answer); }));
}

async function main() {
  const email = (await ask("Admin email: ")).trim();
  const password = await ask("Admin password: ");
  const name = (await ask("Admin name (optional): ")).trim();

  if (!email || password.length < 6) {
    console.error("Email is required and password must be at least 6 characters.");
    process.exit(1);
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashed, name: name || undefined },
    create: { email, password: hashed, name: name || undefined, role: "admin" },
  });

  console.log(`\nAdmin user ready: ${user.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());