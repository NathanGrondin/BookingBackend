import jwt from "jsonwebtoken";
import 'dotenv/config'

const secret = process.env.JWT_SECRET as string;

export interface JwtPayload {
    userId: number;
    role: string;
}

export const generateToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, secret, { expiresIn: process.env.JWT_EXPIRATION });
};

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, secret) as JwtPayload;
};