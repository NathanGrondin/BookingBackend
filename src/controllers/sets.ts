import {Request, Response} from "express";
import {
    addSet,
    getUserSetsSummaries,
    Set,
} from "../database/repositories/sets";


export const addSetEndpoint = async (req: Request, res: Response): Promise<any>  => {

    const { userid, exerciseid, reps, weight, date } = req.body
    const setToAdd = req.body as Set

    if (!userid || !reps || !weight || !date || !exerciseid) {
        return res
            .status(400)
            .json({ error: 'missing parameters for lift' })
    }
    if (typeof userid !== "number" || typeof exerciseid !== "number" || typeof reps !== "number" || typeof weight !== "number" || typeof date !== "number") {
        return res.status(400).json({ error: 'invalid datatype' })
    }
    try {
        await addSet(setToAdd)
        res.status(200).send()
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error: (error as Error).message })
    }
}

export const getUserSetSummary = async (req: Request, res: Response): Promise<any>  => {

    const userId = parseInt(req.query.userId as string, 0)
    if (!userId) {

        return res.status(400).json({ error: 'missing userId' })
    }

    const userSummary = await getUserSetsSummaries(userId)

    if (!userSummary) {
        return res.status(400).json({ error: 'could not get lifts' })
    }

    return res.status(200).json(userSummary);
}

export function calculateMax(lift: Set): number {
    return lift.weight * (1 + lift.reps / 30);
}


