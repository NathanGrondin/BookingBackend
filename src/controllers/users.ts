import { addUser, user } from '../database/repositories/users'
import { Request, Response } from 'express'
import { hashString } from '../utilityFunctions/encryptionUtility'
import { isValidEmail } from '../utilityFunctions/regex'

export const addUserEndpoint = async (req: Request, res: Response) => {
  const { username, password, email } = req.body
  const userToAdd = req.body as user
  userToAdd.role = 'guest'

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
    res.status(200).send()
  } catch (error) {
    res.status(500).send({ error: (error as Error).message })
  }
}
