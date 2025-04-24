import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            t: (key: string) => string,
            logged: {
                equipment_downtime: number;
                partner: string;
            }
        }
    }
}

const handleAuthorization = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ operationStatus: 'ERROR', message: req.t('middlewares.handleAuthorization.notFound') });
        return;
    }

    const token = authHeader.split(" ")[1];

    verify(token, process.env.SECRET as string, (err, decoded: any) => {
        if (err) {
            res.status(401).json({ operationStatus: 'ERROR', message: req.t('middlewares.handleAuthorization.invalid') });
            return;
        }

        req.logged = decoded;

        next();
    });
};

export default handleAuthorization;
