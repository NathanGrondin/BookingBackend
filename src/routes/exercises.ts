import { Router } from 'express'
import { addExerciseEndpoint, getExercisesEndpoint } from '../controllers/exercises'

const router = Router()

router.post('/addExercise', addExerciseEndpoint)
router.get('/getExercises', getExercisesEndpoint)

export default router
