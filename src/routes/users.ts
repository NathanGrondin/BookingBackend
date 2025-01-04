import { Router } from 'express'
import { addUserEndpoint } from '../controllers/users'

const router = Router()

router.post('/addUser', addUserEndpoint)

export default router
