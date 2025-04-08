import authModel from '../models/auth.model';
import createError from 'http-errors';
import { sign } from 'jsonwebtoken';
import { AuthPayload, AuthCredentials, AuthResponse } from '../interfaces/auth.interface';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const login = async (auth: AuthPayload): Promise<AuthResponse> => {
    try {
        const authCredentials: AuthCredentials | undefined = await authModel.login(auth.partner, auth.user);

        if (!authCredentials || !authCredentials.password) {
            throw createError(401, 'incorrect credentials');
        }

        const hashedPassword = crypto.createHash('md5').update(auth.password).digest('hex');

        if (hashedPassword !== authCredentials.password) {
            throw createError(401, 'incorrect credentials');
        }

        delete authCredentials.password;
        const token: string = sign({ id: authCredentials.id }, process.env.SECRET!, { expiresIn: '1h' });

        return {
            token: token
        };
    } catch (err) {
        throw err;
    }
};

export { login };