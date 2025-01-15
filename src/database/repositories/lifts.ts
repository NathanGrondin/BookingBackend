import { db } from '../db'
import {lifts} from '../schema'
import { and, eq } from 'drizzle-orm'

export interface lift {
    userid: number
    name: string
    reps: number
    weight: number
    date: number
}

export const addLift = async (lift: lift): Promise<void> => {
    const { userid, name, reps, weight, date } = lift
    if (!userid || !name || !reps || !weight || !date) {
        throw new Error('missing params for lift')
    }
    await db.insert(lifts).values({ userid, name, reps, weight, date })
}

export const getLiftsByUserAndName = async (
    userId: number,
    name: string
): Promise<lift[] | null> => {
    const result = await db
        .select()
        .from(lifts)
        .where(and(eq(lifts.userid, userId), eq(lifts.name, name)))

    return result
}
