import express, { Request, Response } from 'express'
import users from './routes/users'
import dotenv from 'dotenv'
import cors from 'cors';

dotenv.config()
const app = express()
app.use(cors());
app.use(express.json())

app.use('/users', users)

const PORT = Number(process.env.PORT) || 3000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
