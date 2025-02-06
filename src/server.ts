import express from 'express'
import users from './routes/users'
import 'dotenv/config'
import cors from 'cors';
import {initializeDatabase} from "./database/db";

async function main() {

  await initializeDatabase()
  const app = express()
  app.use(cors());
  app.use(express.json())

  app.use('/users', users)

  const PORT = Number(process.env.PORT) || 3000
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })

}

main().catch((err) => {console.error(err)})
