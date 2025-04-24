import { AuthCredentials } from '../interfaces/auth.interface';
import { RowDataPacket, FieldPacket } from 'mysql2';
import createError from 'http-errors';
import { pool } from '../config/database';

const login = async (user: string, t: (key: string, options?: object) => string): Promise<AuthCredentials> => {
    try {
        const [rows]: [RowDataPacket[], FieldPacket[]] = await pool.query(
            `SELECT id, nome AS name, login AS user, senha AS password, status, email, foto AS image, IFNULL(idioma, "pt") AS language, IFNULL(tempo_inatividade_equi, 72) AS equipment_downtime FROM usuarios WHERE login = ?`,
            [user]
        );

        return rows[0] as AuthCredentials;
    } catch (err) {
        throw createError(500, t('models.authModel.login'));
    }
};

export default { 
    login
};
