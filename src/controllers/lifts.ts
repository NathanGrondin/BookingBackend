import {Request, Response} from "express";
import {addLift, getLiftsByUserAndName, lift} from "../database/repositories/lifts";
import {initializeDatabase} from "../database/db";

export const addLiftEndpoint = async (req: Request, res: Response) : Promise<void> => {
    const { userId, name, reps, weight, date } = req.body
    const liftToAdd = req.body as lift

    if (!userId || !name || !reps || !weight || !date) {
        res
            .status(400)
            .json({ error: 'missing parameters for lift' })
    }
    if (typeof userId !== "number" || typeof name !== "string" || typeof reps !== "number" || typeof weight !== "number" || typeof date !== "number") {
        res.status(400).json({ error: 'invalid datatype' })
    }

    try {
        await addLift(liftToAdd)
        res.status(200).send()
    } catch (error) {
        res.status(500).send({ error: (error as Error).message })
    }
}

export const getUserLifts = async (req: Request, res: Response) : Promise<void> => {
    const {userId, name} = req.body

    if (!userId || !name) {
        res.status(400).json({ error: 'missing userId or name of lift' })
    }

    const lifts = await getLiftsByUserAndName(userId, name)

    if (!lifts) {
        res.status(400).json({ error: 'could not get lifts' })
    }

    const liftsByName = lifts?.reduce((acc, lift) => {

        if (!acc[lift.name]) {
            acc[lift.name] = [];
        }

        acc[lift.name].push(lift);
        return acc;
    }, {} as Record<string, lift[]>);

    res.status(200).json(liftsByName);
}



