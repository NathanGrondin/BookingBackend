import { db } from '../db'
import { users } from '../schema'
import { and, eq } from 'drizzle-orm'

export interface user {
  id: number | undefined
  username: string
  password: string
  email: string
  role: string | undefined
}

export const addUser = async (user: user): Promise<void> => {
  const { username, password, email, role } = user
  if (!role) {
    throw new Error('role is undefined')
  }
  await db.insert(users).values({ username, password, email, role })
}

export const getUserByUsernamePassword = async (
  username: string,
  password: string
): Promise<user | null> => {
  const result = await db
    .select()
    .from(users)
    .where(and(eq(users.username, username), eq(users.password, password)))
  if (result.length < 1) {
    return null
  }
  return result[0]
}
