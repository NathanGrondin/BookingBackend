import { Router } from 'express'
import { addSetEndpoint, getUserSetSummary } from '../controllers/sets'

const router = Router()

router.post('/addUserSets', addSetEndpoint)
router.get('/getUserSets', getUserSetSummary)

export default router
