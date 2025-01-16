import {addUser, getUserByUsername, user} from '../database/repositories/users'
import { Request, Response } from 'express'
import { hashString, verifyString } from '../utilityFunctions/encryptionUtility'
import { isValidEmail } from '../utilityFunctions/regex'
import {generateToken, JwtPayload, verifyToken} from "../utilityFunctions/authentication";


export const addUserEndpoint = async (req: Request, res: Response) => {
  const { username, password, email } = req.body
  const userToAdd = req.body as user
  userToAdd.role = 'admin'

  if (
    !username ||
    !password ||
    typeof username !== 'string' ||
    typeof password !== 'string'
  ) {
    return res
      .status(400)
      .json({ error: 'Invalid or missing username or password' })
  }
  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid or missing email' })
  }

  try {
    userToAdd.password = await hashString(password)
    await addUser(userToAdd)
    return res.status(200).send()
  } catch (error) {
    return res.status(500).send({ error: (error as Error).message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const {username, password} = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'missing username or password' })
    }

    const user = await getUserByUsername(username)

    if (!user || !(await verifyString(password, user.password))) {
      return res.status(400).json({ error: 'wrong username or password' })
    }

    const payload : JwtPayload = {
      userId:user?.id || -1,
      role:user?.role || 'guest'

    }
    const token = generateToken(payload)
    return res.status(200).json({token})
  }

  catch (error) {
    return res.status(404).json({ error: 'user not found' })
  }
}