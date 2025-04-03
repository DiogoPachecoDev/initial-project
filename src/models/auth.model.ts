import pool from '../config/database';
import { AuthCredentials } from '../interfaces/auth.interface';
import { RowDataPacket, FieldPacket } from 'mysql2';

const login = async (auth: { email: string }): Promise<AuthCredentials | undefined> => {
    try {
        const [rows]: [RowDataPacket[], FieldPacket[]] = await pool.query('SELECT * FROM users WHERE email = ?', [auth.email]);
        return rows[0] as AuthCredentials || undefined;
    } catch (err) {
        console.error('Erro na consulta de login:', err);
        throw err;
    }
};

export default { login };
