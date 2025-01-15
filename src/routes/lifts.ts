import { Router } from 'express'
import { addLiftEndpoint, getUserLifts } from '../controllers/lifts'

const liftsRouter = Router()

liftsRouter.post('/addUserLifts', addLiftEndpoint)
liftsRouter.get('/getUserLifts', getUserLifts)

export default liftsRouter
