import {text, pgTable, serial, integer, bigint} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').notNull(),
})

export const sets = pgTable('sets', {
  id: serial('id').primaryKey(),
  exerciseid: integer('exerciseid').notNull(),
  userid: integer("userid").notNull(),
  reps: integer("reps").notNull(),
  weight: integer("weight").notNull(),
  date: bigint("date", {mode: "number"}).notNull(),
})

export const exercises = pgTable('exercises', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
})


