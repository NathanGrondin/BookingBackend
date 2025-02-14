import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import 'dotenv/config'

const pool = new Pool({
  connectionString: "postgresql://user:pass@localhost:5432/booking-backend",
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

  console.log('initializing sets')
  await db.execute(`
    CREATE TABLE IF NOT EXISTS sets (
        id SERIAL PRIMARY KEY,
        exerciseid INTEGER NOT NULL,
        userid INTEGER NOT NULL,
        reps INTEGER NOT NULL,
        weight INTEGER NOT NULL,
        date BIGINT NOT NULL
    );
  `)

  console.log('initializing exercises')
  await db.execute(`
    CREATE TABLE IF NOT EXISTS exercises (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE
    );
  `)
}
