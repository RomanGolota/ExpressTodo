import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

type MyRequest = Request & { user: any };

const authMiddleware = (req: MyRequest, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({ message: 'Auth error' });
        }
        const token = authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Auth error' });
        }

        const decoded = jsonwebtoken.verify(token, process.env.SECRET_KEY!);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;