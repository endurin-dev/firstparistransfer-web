// Prisma 7: connection URLs and CLI/migration settings live here now,
// not in schema.prisma. This file is used by the `prisma` CLI
// (migrate, studio, db seed) — NOT by your running app, which uses
// src/lib/prisma.ts + a driver adapter instead.
//
// NOTE: Prisma's CLI does NOT auto-load ".env.local" (that's a Next.js
// convention, not a Node/dotenv one). We load both files explicitly here
// so it works whichever file you put DATABASE_URL in, with .env.local
// taking priority if both exist (matching Next.js behavior).
import path from "node:path";
import dotenv from "dotenv";
import { defineConfig, env } from "prisma/config";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), ".env.local"), override: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});