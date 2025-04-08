import createError from 'http-errors';
import mysql from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  connectTimeout: 10000,
});

export const testDatabaseConnection = async () => {
  try {
    const connection = await pool.getConnection();
    connection.release();
  } catch (error) {
    throw createError(500, 'database connection failed.');
  }
};