import { pool } from '../config/database';
import { AuthCredentials } from '../interfaces/auth.interface';
import { RowDataPacket, FieldPacket } from 'mysql2';
import createError from 'http-errors';

const lockWarning = async (partner: string, t: (key: string, options?: object) => string): Promise<number> => {
    const connection = await pool.getConnection();

    try {
        await connection.query('USE ??', [partner]);
        const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.query('SELECT ativo AS active FROM avisos WHERE nome_aviso = "bloqueio"');

        return rows[0].active;
    } catch (err) {
        throw createError(400, t('models.authModel.lockWarning'));
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const login = async (partner: string, user: string, t: (key: string, options?: object) => string): Promise<AuthCredentials> => {
    const connection = await pool.getConnection();

    try {
        await connection.query('USE ??', [partner]);
        const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.query('SELECT id, nome AS name, login AS user, senha AS password, status, email, foto AS image, IFNULL(idioma, "pt") AS language, tempo_inatividade_equi AS equipment_downtime FROM usuarios WHERE login = ?', [user]);

        return rows[0] as AuthCredentials;
    } catch (err) {
        throw createError(400, t('models.authModel.login'));
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const permissions = async (partner: string, user_id: number, t: (key: string, options?: object) => string): Promise<object> => {
    const connection = await pool.getConnection();

    try {
        await connection.query('USE ??', [partner]);

        const [menu]: [RowDataPacket[], FieldPacket[]] = await connection.query('SELECT permissao AS permission FROM permissao WHERE usuarios_id = ?', [user_id]);
        const [submenu]: [RowDataPacket[], FieldPacket[]] = await connection.query('SELECT menu, menu_sub AS submenu FROM permissao_submenu WHERE id_usuario = ?', [user_id]);

        return {menu: menu, submenu: submenu};
    } catch (err) {
        throw createError(400, t('models.authModel.permissions'));
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const log = async (partner: string, auth: AuthCredentials, t: (key: string, options?: object) => string): Promise<void> => {
    const connection = await pool.getConnection();

    try {
        await connection.query('USE ??', [partner]);
        await connection.query('INSERT INTO log (id_usuario, nome_usuario, data_acao, local_acao, login_usuario, acaofeita) VALUES (?, ?, ?, ?, ?, ?)', [auth.id, auth.name, new Date(), 'login', auth.user, 'logou no sistema']);
    } catch (err) {
        throw createError(400, t('models.authModel.log'));
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

export default { login, lockWarning, permissions, log };
