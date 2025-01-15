import express from 'express'
import users from './routes/users'
import lifts from './routes/lifts'
import dotenv from 'dotenv'
import cors from 'cors';

dotenv.config()
const app = express()
app.use(cors());
app.use(express.json())

app.use('/users', users)
app.use('/lifts', lifts)

const PORT = Number(process.env.PORT) || 3000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
