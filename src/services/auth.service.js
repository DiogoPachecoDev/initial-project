const authModel = require('../models/auth.model');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
require('dotenv').config();

const login = async function(auth) {
    const authCredentials = await authModel.login({ email: auth.email });

    if(!authCredentials) {
        return createError(401, 'Incorrect credentials');
    }

    const validatePassword = await bcrypt.compare(auth.password, authCredentials.password);
    delete authCredentials.password;

    if(!validatePassword) {
        return createError(401, 'Incorrect credentials');
    }
    
    const token = sign({ id: authCredentials.id }, process.env.SECRET, { expiresIn: 1000 });

    return {
        auth: true,
        token: token,
        user: authCredentials
    };
}

module.exports = {
    login
}
