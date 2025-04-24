import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import createErrors from 'http-errors';

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw createErrors(422, { errors: errors.array() });
    }

    next();
};

export default handleValidationErrors;