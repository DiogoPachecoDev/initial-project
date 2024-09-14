const { body } = require('express-validator');
const { validatorMessage } = require('../utils/errorMessage');

const login = function() {
    return [
        body('email', validatorMessage('email')).exists().bail().isString(),
        body('password', validatorMessage('password')).exists().bail().isString()
    ]
}

module.exports = {
    login
}
