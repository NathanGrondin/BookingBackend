import { db } from '../db'
import { exercises } from '../schema'

export interface Exercise {
  id: number | undefined
  name: string
}

export const addExercise = async (exercise: Exercise): Promise<void> => {
  const regex = /^[A-Za-z\s]+$/
  const name = exercise.name

  if (!regex.test(name)) {
    throw new Error('invalid exercise name')
  }

  await db.insert(exercises).values({ name })
}

export const getExercises = async (): Promise<Exercise[] | null> => {
    return await db.select().from(exercises)
}
