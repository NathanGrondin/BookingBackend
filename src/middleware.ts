import { Request, Response, NextFunction } from "express";
import { verifyToken, JwtPayload } from "./utilityFunctions/authentication";

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export const authenticateToken = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: "Access token required" });
        return
    }

    try {

        const payload = verifyToken(token);
        req.user = payload;
        next();

    } catch (error) {
        res.status(403).json({ error: "Invalid or expired token" });
    }
};