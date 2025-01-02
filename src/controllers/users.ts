import {addUser, user} from "../database/repositories/users";
import { Request, Response } from "express";

export const addUserEndpoint = async (req: Request, res: Response) => {
    const {username, password, email} = req.body;
    const userToAdd = req.body as user
    userToAdd.role = 'guest'

    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ error: "Invalid or missing username or password" });
    }
    if (!email || typeof email !== 'string' || !email.includes("@")) {
        return res.status(400).json({ error: "Invalid or missing email" });
    }

    try{
        await addUser(userToAdd)
        res.status(200).json({})
    }

    catch (error) {
        res.status(500).send({error: (error as Error).message});
    }
}