import {Request, Response} from "express";
import {
    addExercise, Exercise,
    getExercises
} from "../database/repositories/exercises";


export const addExerciseEndpoint = async (req: Request, res: Response): Promise<any>  => {
    const exercise : Exercise = req.body

    if (!exercise.name) {
        return res
            .status(400)
            .json({ error: 'missing parameters for lift' })
    }

    if (typeof exercise.name !== "string") {
        return res.status(400).json({ error: 'invalid datatype' })
    }

    try {
        await addExercise(exercise)
        res.status(200).send()
    } catch (error) {
        return res.status(500).send({ error: (error as Error).message })
    }
}

export const getExercisesEndpoint = async (req: Request, res: Response): Promise<any>  => {
    try {
        const exercises = await getExercises()
        return res.status(200).json(exercises)
    } catch (error) {
        return res.status(500).send({error: (error as Error).message})
    }
}
