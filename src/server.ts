import express from 'express'
import users from './routes/users'
import sets from './routes/sets'
import exercises from './routes/exercises'
import 'dotenv/config'
import cors from 'cors';
import {initializeDatabase} from "./database/db";

async function main() {

  await initializeDatabase()
  const app = express()
  app.use(cors());
  app.use(express.json())

  app.use('/sets', sets)
  app.use('/users', users)
  app.use('/exercises', exercises)

  const PORT = Number(process.env.PORT) || 3000
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })

}

main().catch((err) => {console.error(err)})
