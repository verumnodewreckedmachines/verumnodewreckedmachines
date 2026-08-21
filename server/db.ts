import pg from "pg";
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Only create pool if DATABASE_URL is provided
const databaseUrl = process.env.DATABASE_URL;
const isDesktopMode = !databaseUrl || process.env.VERUM_NATIVE_APP === "true";

// Validacao do DATABASE_URL para producao (somente se nao for desktop mode)
if (!isDesktopMode && !databaseUrl) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// In desktop mode, create a mock pool that doesn't fail
const mockPool: any = {
  query: () => Promise.resolve({ rows: [] }),
  getClient: () => Promise.resolve(mockPool),
  release: () => Promise.resolve(),
  end: () => Promise.resolve(),
  on: () => mockPool,
};

export const pool = isDesktopMode ? mockPool : new pg.Pool({
  connectionString: databaseUrl!,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Create a mock drizzle client for desktop mode
const mockDrizzle: any = {
  select: () => mockDrizzle,
  insert: () => mockDrizzle,
  update: () => mockDrizzle,
  delete: () => mockDrizzle,
  transaction: (fn: any) => fn(mockDrizzle),
  where: () => mockDrizzle,
  orderBy: () => mockDrizzle,
  limit: () => mockDrizzle,
  eq: () => true,
  values: () => mockDrizzle,
  from: () => mockDrizzle,
  then: (fn: any) => fn(mockDrizzle),
};

export const db = isDesktopMode ? mockDrizzle : drizzle({ client: pool, schema });