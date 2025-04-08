import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: string[];
        }
    }
}

const handleAuthorization = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({operationStatus: 'ERROR', message: 'unauthorized user'});
        return;
    }

    verify(token, process.env.SECRET as string, (err, decoded: any) => {
        if (err) {
            res.status(401).json({operationStatus: 'ERROR', message: 'unauthorized user'});
            return;
        }

        req.user = decoded;

        next();
    });
};

export default handleAuthorization;
