const { verify } = require('jsonwebtoken');
require('dotenv').config();

const handleAuthorization = function(req, res, next) {
    const token = req.headers['token'];

    if(!token) {
        return res.status(401).send(['Unauthorized user']);
    }

    verify(token, process.env.SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).send(['Unauthorized user']);
        }

        req.user_id = decoded.id;

        next();
    })
};

module.exports = handleAuthorization;
