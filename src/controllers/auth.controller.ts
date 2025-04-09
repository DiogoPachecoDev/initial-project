import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import * as authService from '../services/auth.service';
import createErrors from 'http-errors';

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const t = req.t;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw createErrors(422, { errors: errors.array() });
        }

        const response = await authService.login(req.body, t);

        res.status(200).json({operationStatus: 'SUCCESS', message: t('controllers.authController.login.success'), data: response});
    } catch (error) {
        next(error);
    }
};

export default { login };
