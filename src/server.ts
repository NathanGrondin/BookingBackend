import express, { Request, Response } from "express";
import {addUserEndpoint} from "./controllers/users";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/api/users", addUserEndpoint)

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

