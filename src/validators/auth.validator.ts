import { body } from 'express-validator';
import { validatorMessage } from '../utils/errorMessage';

const login = (): Array<ReturnType<typeof body>> => {
    return [
        body('email', validatorMessage('email')).exists().bail().isString(),
        body('password', validatorMessage('password')).exists().bail().isString()
    ];
};

export default { login };
