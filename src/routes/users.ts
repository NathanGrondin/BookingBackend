import { Router } from 'express'
import { addUserEndpoint, login } from '../controllers/users'

const userRouter = Router()

userRouter.post('/addUser', addUserEndpoint)
userRouter.post('/login', login)

export default userRouter
