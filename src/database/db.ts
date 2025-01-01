import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: "postgresql://user:pass@localhost:5432/booking-backend",
});

export const db = drizzle(pool);

export async function initializeDatabase() {
    console.log('initializing db')
    await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        role TEXT NOT NULL
    );
  `);
}