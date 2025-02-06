import {text, pgTable, serial, integer} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').notNull(),
})

export const lifts = pgTable('lifts', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  userid: integer("userid").notNull(),
  reps: integer("reps").notNull(),
  weight: integer("weight").notNull(),
  date: integer("date").notNull(),
})
