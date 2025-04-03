import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user_id?: string;
        }
    }
}

const handleAuthorization = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['token'] as string;

    if (!token) {
        res.status(401).send(['Unauthorized user']);
        return;
    }

    verify(token, process.env.SECRET as string, (err, decoded: any) => {
        if (err) {
            res.status(401).send(['Unauthorized user']);
            return;
        }

        req.user_id = decoded.id;

        next();
    });
};

export default handleAuthorization;
