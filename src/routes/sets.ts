import { Router } from 'express'
import {addSetEndpoint, getHighscoresEndpoint, getUserSetSummary} from '../controllers/sets'

const router = Router()

router.post('/addUserSets', addSetEndpoint)
router.get('/getUserSets', getUserSetSummary)
router.get('/getHighscores', getHighscoresEndpoint)

export default router
