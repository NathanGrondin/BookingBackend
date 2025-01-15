import { Router } from 'express'
import { addUserEndpoint } from '../controllers/users'

const userRouter = Router()

userRouter.post('/addUser', addUserEndpoint)

export default userRouter
