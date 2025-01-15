import {addUser, getUserByUsername, getUserByUsernamePassword, user} from '../database/repositories/users'
import { Request, Response } from 'express'
import { hashString, verifyString } from '../utilityFunctions/encryptionUtility'
import { isValidEmail } from '../utilityFunctions/regex'
import {generateToken, JwtPayload, verifyToken} from "../utilityFunctions/authentication";


export const addUserEndpoint = async (req: Request, res: Response) : Promise<void> => {
  const { username, password, email } = req.body
  const userToAdd = req.body as user
  userToAdd.role = 'admin'

  if (
    !username ||
    !password ||
    typeof username !== 'string' ||
    typeof password !== 'string'
  ) {
    res
      .status(400)
      .json({ error: 'Invalid or missing username or password' })
  }
  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    res.status(400).json({ error: 'Invalid or missing email' })
  }

  try {
    userToAdd.password = await hashString(password)
    await addUser(userToAdd)
    res.status(200).send()
  } catch (error) {
    res.status(500).send({ error: (error as Error).message })
  }
}

export const login = async (req: Request, res: Response) : Promise<void> => {
  const {username, password} = req.body

  if (!username || !password) {
    res.status(400).json({ error: 'missing username or password' })
  }

  const user = await getUserByUsername(username)

  if (!user || !(await verifyString(password, user.password))) {
    res.status(400).json({ error: 'wrong username or password' })
  }


  const payload : JwtPayload = {
    userId:user?.id || -1,
    role:user?.role || 'guest'

  }
  const token = generateToken(payload)
  res.status(200).json({token})

}