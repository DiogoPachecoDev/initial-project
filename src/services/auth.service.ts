import authModel from '../models/auth.model';
import createError from 'http-errors';
import { sign } from 'jsonwebtoken';
import { AuthPayload, AuthCredentials, AuthResponse } from '../interfaces/auth.interface';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const login = async (auth: AuthPayload, t: (key: string) => string): Promise<AuthResponse> => {
    try {
        const lockWarning: number = await authModel.lockWarning(auth.partner, t);

        if(lockWarning == 1) {
            throw createError(401, t('services.authService.login.lockWarning'));
        }

        const authCredentials: AuthCredentials = await authModel.login(auth.partner, auth.user, t);

        if (!authCredentials || !authCredentials.password) {
            throw createError(401, t('services.authService.login.credentials'));
        }

        const hashedPassword = crypto.createHash('md5').update(auth.password).digest('hex');

        if (hashedPassword !== authCredentials.password) {
            throw createError(401, t('services.authService.login.credentials'));
        }

        if (authCredentials.status == 'i') {
            throw createError(401, t('services.authService.login.inactiveUser'));
        }

        delete authCredentials.status;
        delete authCredentials.password;
        
        const permission: object = await authModel.permissions(auth.partner, authCredentials.id, t);
        const token: string = sign({ ...authCredentials, permission: permission}, process.env.SECRET!, { expiresIn: '24h' });
        
        await authModel.log(auth.partner, authCredentials, t);

        return {
            token: token
        };
    } catch (err) {
        throw err;
    }
};

export { login };