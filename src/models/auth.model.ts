import { pool } from '../config/database';
import { AuthCredentials } from '../interfaces/auth.interface';
import { RowDataPacket, FieldPacket } from 'mysql2';

const login = async (partner: string, user: string): Promise<AuthCredentials | undefined> => {
    const connection = await pool.getConnection();

    try {
        await connection.query('USE ??', [partner]);
        const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.query('SELECT id, nome AS name, login AS user, senha AS password, email, foto AS image, idioma AS language, tempo_inatividade_equi AS equipment_downtime FROM usuarios WHERE login = ? AND status != "i"', [user]);
        return rows[0] as AuthCredentials || undefined;
    } catch (err) {
        throw err;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

export default { login };
