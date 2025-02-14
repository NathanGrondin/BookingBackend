import { Router } from 'express'
import { addUserEndpoint, login } from '../controllers/users'

const router = Router()

router.post('/addUser', addUserEndpoint)
router.post('/login', login)

export default router
