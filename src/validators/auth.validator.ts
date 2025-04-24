import { body } from 'express-validator';

const login = () => [
    body('user')
        .exists()
        .withMessage((value, { req }) => req.t('validators.authValidator.login.userNotFound'))
        .bail()
        .isString()
        .withMessage((value, { req }) => req.t('validators.authValidator.login.userInvalid'))
        .escape(),
    body('password')
        .exists()
        .withMessage((value, { req }) => req.t('validators.authValidator.login.passwordNotFound'))
        .bail()
        .isString()
        .withMessage((value, { req }) => req.t('validators.authValidator.login.passwordInvalid'))
        .escape()
];

export default { login };
