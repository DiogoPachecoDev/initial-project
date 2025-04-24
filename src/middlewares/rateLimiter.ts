import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request, res: Response, next: NextFunction, options: any) => {
        res.status(429).json({
            operationStatus: 'ERROR',
            message: req.t('middlewares.rateLimiter.default'),
        });
    },
});

export default rateLimiter;
