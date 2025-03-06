import { db } from '../db'
import {exercises, sets, users} from '../schema'
import {eq} from 'drizzle-orm'
import {calculateMax} from "./../../controllers/sets"

const topX = 10

export interface Set {
    username?: string
    userid?: number
    exerciseid?: number
    exerciseName?: string
    estimatedMax?: number,
    reps: number
    weight: number
    date: number
}

export interface SetsSummary {
    estimatedMax?: number,
    estimatedMaxDate?: number,
    sets: Set[]
}
export interface HighscoreRow {
    exerciseName?: string,
    username: string,
    estimatedMax: number,
    date: number,
}
export interface HighscoreData {
    exerciseRows: HighscoreRow[]
    userRow?: HighscoreRow,
    userRank?: number
}

export const addSet = async (set: Set): Promise<void> => {
    const { userid, exerciseid, reps, weight, date } = set
    if (!userid || !exerciseid || !reps || !weight || !date) {
        throw new Error('missing params for lift')
    }

    await db.insert(sets).values({ userid, exerciseid, reps, weight, date})
}

export const getHighscores = async () => {

    const highsoreRawData = await db
        .select({"username": users.username, "exerciseName": exercises.name, "weight": sets.weight, "reps": sets.reps, "date": sets.date})
        .from(sets)
        .innerJoin(users, eq(sets.userid, users.id))
        .innerJoin(exercises, eq(sets.exerciseid, exercises.id))

    const highScoreData : HighscoreRow[] = highsoreRawData.map((highscoreRow) => ({
        exerciseName: highscoreRow.exerciseName,
        estimatedMax: calculateMax(highscoreRow),
        username: highscoreRow.username,
        date: highscoreRow.date,
    }))

    highScoreData.sort((row1, row2) => row2.estimatedMax - row1.estimatedMax)


    return getHighscoreData(highScoreData)

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
            estimatedMax: calculateMax(item),
            reps: item.reps,
            weight: item.weight,
            date: item.date,
        }));

    return  transformSets(userSets)

}

const transformSets = (sets: Set[]): Record<string, SetsSummary> => {
    return sets.reduce((acc, set) => {
        const { exerciseName, date, estimatedMax } = set as Set;

        if (!exerciseName || !estimatedMax) {
            return acc
        }

        if (!acc[exerciseName]) {
            acc[exerciseName] = {
                sets: [set],
                estimatedMax: estimatedMax,
                estimatedMaxDate: date
            };
        }
        else {
            acc[exerciseName].sets.push(set);
            if (acc[exerciseName].estimatedMax && estimatedMax > acc[exerciseName].estimatedMax) {
                acc[exerciseName].estimatedMax = estimatedMax;
                acc[exerciseName].estimatedMaxDate = date;
            }
        }
        return acc;
    }, {} as Record<string, SetsSummary>);
};

const getHighscoreData = (highscoreRows: HighscoreRow[]): Record<string, HighscoreData> => {
    return highscoreRows.reduce((acc, highscoreRow) => {
        const { exerciseName, date, estimatedMax, username } = highscoreRow as HighscoreRow;

        if (!username || !estimatedMax || !date || !exerciseName) {
            return acc
        }

        if (!acc[exerciseName]) {
            acc[exerciseName] = {
                exerciseRows: [highscoreRow],
            }
        }

        else {
            if ((acc[exerciseName].exerciseRows).length < topX && !acc[exerciseName].exerciseRows.some(row => row.username === highscoreRow.username)) {
                acc[exerciseName].exerciseRows.push(highscoreRow)
            }
        }

        return acc
    },{} as Record<string, HighscoreData>)
}



