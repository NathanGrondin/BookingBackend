import { db } from '../db'
import {exercises, sets} from '../schema'
import { eq } from 'drizzle-orm'
import {calculateMax} from "./../../controllers/sets"

export interface Set {
    userid?: number
    exerciseid?: number
    exerciseName?: string
    reps: number
    weight: number
    date: number
}

export interface SetsSummary {
    estimatedMax?: number,
    estimatedMaxDate?: number,
    sets: Set[]
}

export const addSet = async (set: Set): Promise<void> => {
    const { userid, exerciseid, reps, weight, date } = set
    if (!userid || !exerciseid || !reps || !weight || !date) {
        throw new Error('missing params for lift')
    }

    await db.insert(sets).values({ userid, exerciseid, reps, weight, date })
}

export const getUserSetsSummaries = async (
    userId: number,
) => {

    const result = await db
        .select({"reps": sets.reps, "weight": sets.weight, "date": sets.date, "exerciseName": exercises.name})
        .from(sets)
        .innerJoin(exercises, eq(sets.exerciseid, exercises.id))
        .where(eq(sets.userid, userId))
    const userSets: Set[] =  result.map((item) => ({
            exerciseName: item.exerciseName,
            reps: item.reps,
            weight: item.weight,
            date: item.date,
        }));

    return  transformSets(userSets)

}

const transformSets = (sets: Set[]): Record<string, SetsSummary> => {
    return sets.reduce((acc, set) => {
        const { exerciseName, reps, weight, date } = set as Set;
        const currentEstimatedMax = calculateMax(set);

        if (!exerciseName) {
            return acc
        }

        if (!acc[exerciseName]) {
            acc[exerciseName] = {
                sets: [set],
                estimatedMax: currentEstimatedMax,
                estimatedMaxDate: set.date
            };
        }
        else {
            acc[exerciseName].sets.push(set);
            if (acc[exerciseName].estimatedMax && currentEstimatedMax > acc[exerciseName].estimatedMax) {
                acc[exerciseName].estimatedMax = currentEstimatedMax;
                acc[exerciseName].estimatedMaxDate = date;
            }
        }
        return acc;
    }, {} as Record<string, SetsSummary>);
};



