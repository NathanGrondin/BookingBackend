import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const hashString = async (plainString: string): Promise<string> => {
    const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
    return bcrypt.hash(plainString, saltRounds);
};

export const verifyString = async (plainString: string, hashedString: string): Promise<boolean> => {
    return bcrypt.compare(plainString, hashedString);
};
