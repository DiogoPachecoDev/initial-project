const { validationResult } = require('express-validator');
const authService = require('../services/auth.service');
const createErrors = require('http-errors');

const login = async function(req, res, next) {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            throw createErrors(422, { errors: errors.array() })
        }

        const response = await authService.login(req.body);

        if(response && response.message) {
            throw response;
        }

        res.status(200).send(response);
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    login
}
