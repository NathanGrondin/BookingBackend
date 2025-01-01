import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const hashString = async (plainString: string): Promise<string> => {
    const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
    return await bcrypt.hash(plainString, saltRounds);
};

const verifyString = async (plainString: string, hashedString: string): Promise<boolean> => {
    return await bcrypt.compare(plainString, hashedString);
};
