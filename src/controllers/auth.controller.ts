import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import authService from '../services/auth.service';
import createErrors from 'http-errors';
import dotenv from 'dotenv';

dotenv.config();

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const response = await authService.login(req.body, req.t);

        res.cookie('token', response.token, {httpOnly: true, secure: process.env.ENVIRONMENT === 'production', sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000});
        res.status(200).json({operationStatus: 'SUCCESS', message: req.t('controllers.authController.login.success')});
    } catch (error) {
        next(error);
    }
};

export default { login };
