import {db} from "../db";
import {users} from "../schema";
import {and, eq} from "drizzle-orm";

export interface user {
    username: string;
    password: string;
    email: string;
    role: string;
}

export const addUser = async (user: user): Promise<void> => {
    const {username, password, email, role} = user;
    await db.insert(users).values({username, password, email, role});
};

export const getUserByUsernamePassword = async (username: string, password: string): Promise<user | null> => {

    const result = await db.select().from(users).where(and(eq(users.username, username), eq(users.password, password)))
    if (result.length < 1){
        throw new Error("Could not find user");
    }
    return result[0]
}


