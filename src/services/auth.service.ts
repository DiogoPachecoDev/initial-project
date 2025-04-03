import authModel from '../models/auth.model';
import createError from 'http-errors';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AuthCredentials } from '../interfaces/auth.interface';
import dotenv from 'dotenv';

dotenv.config();

const login = async (auth: { email: string; password: string }): Promise<{ auth: boolean; token: string; user: Omit<AuthCredentials, 'password'> } | createError.HttpError> => {
    const authCredentials: AuthCredentials | undefined = await authModel.login({ email: auth.email });

    if (!authCredentials || !authCredentials.password) {
        return createError(401, 'Incorrect credentials');
    }

    const validatePassword = await bcrypt.compare(auth.password, authCredentials.password);

    if (!validatePassword) {
        return createError(401, 'Incorrect credentials');
    }

    delete authCredentials.password;

    const secret = process.env.SECRET;
    
    if (!secret) {
        throw createError(500, 'JWT secret is not defined');
    }

    const token: string = sign({ id: authCredentials.id }, secret, { expiresIn: 1000 });

    return {
        auth: true,
        token: token,
        user: authCredentials
    };
};

export { login };
