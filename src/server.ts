import express, { Request, Response } from 'express'
import users from './routes/users'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(express.json())

app.use('/users', users)

const PORT = Number(process.env.PORT) || 3000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
