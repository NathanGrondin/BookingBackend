import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

export const db = drizzle(pool)

export async function initializeDatabase() {
  console.log('initializing users')
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        role TEXT NOT NULL
    );
  `)

  console.log('initializing lifts')
  await db.execute(`
    CREATE TABLE IF NOT EXISTS lifts (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        userId INTEGER NOT NULL,
        reps INTEGER NOT NULL,
        weight INTEGER NOT NULL,
        date INTEGER NOT NULL
    );
  `)
}
