const pool = require('../config/database');

const login = async (auth) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [auth.email]);
        return rows[0];
    } catch (err) {
        console.error('Erro na consulta de login:', err);
        throw err;
    }
};

module.exports = {
    login,
};
