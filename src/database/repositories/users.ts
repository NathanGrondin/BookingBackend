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

export const getUserByUsername = async (
    username: string,
): Promise<user | null> => {
  const result = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
  if (result.length < 1) {
    throw new Error('Could not find user')
  }
  return result[0]
}


