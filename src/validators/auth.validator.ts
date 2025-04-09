import { body } from 'express-validator';

const login = () => [
    body('user')
        .exists()
        .withMessage((value, { req }) => req.t('utils.errorMessage.notExists', { attribute: 'user' }))
        .bail()
        .isString()
        .withMessage((value, { req }) => req.t('utils.errorMessage.invalid', { attribute: 'user' })),
    body('password')
        .exists()
        .withMessage((value, { req }) => req.t('utils.errorMessage.notExists', { attribute: 'password' }))
        .bail()
        .isString()
        .withMessage((value, { req }) => req.t('utils.errorMessage.invalid', { attribute: 'password' })),
    body('partner')
        .exists()
        .withMessage((value, { req }) => req.t('utils.errorMessage.notExists', { attribute: 'partner' }))
        .bail()
        .isString()
        .withMessage((value, { req }) => req.t('utils.errorMessage.invalid', { attribute: 'partner' })),
];

export default { login };
