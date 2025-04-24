import authModel from '../models/auth.model';
import createError from 'http-errors';
import { sign } from 'jsonwebtoken';
import { AuthPayload, AuthCredentials, AuthResponse } from '../interfaces/auth.interface';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const login = async (auth: AuthPayload, t: (key: string) => string): Promise<AuthResponse> => {
    try {
        const authCredentials: AuthCredentials = await authModel.login(auth.user, t);

        if (!authCredentials || !authCredentials.password) {
            throw createError(401, t('services.authService.login.credentials'));
        }

        const hashedPassword = crypto.createHash('md5').update(auth.password).digest('hex');

        if (hashedPassword !== authCredentials.password) {
            throw createError(401, t('services.authService.login.credentials'));
        }

        delete authCredentials.status;
        delete authCredentials.password;
        
        const token: string = sign({ ...authCredentials}, process.env.SECRET!, { expiresIn: '24h' });

        return {
            token: token
        };
    } catch (err) {
        if (createError.isHttpError(err)) {
            throw err;
        }
        
        throw createError(500, t('services.authService.login.default'));
    }
};

export default { login };