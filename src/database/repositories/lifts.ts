import { db } from '../db'
import {lifts} from '../schema'
import { and, eq } from 'drizzle-orm'

export interface lift {
    userId: number
    name: string
    reps: number
    weight: number
    date: number
}

export const addLift = async (lift: lift): Promise<void> => {
    const { userId, name, reps, weight, date } = lift
    if (!userId || !name || !reps || !weight || !date) {
        throw new Error('missing params for lift')
    }
    await db.insert(lifts).values({ userId, name, reps, weight, date })
}

export const getLiftsByUserAndName = async (
    userId: number,
    name: string
): Promise<lift[]> => {
    const result = await db
        .select()
        .from(lifts)
        .where(and(eq(lifts.userId, userId), eq(lifts.name, name)))
    if (result.length < 1) {
        throw new Error('Could not find user')
    }
    return result
}
