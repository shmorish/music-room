import mysql from 'mysql2/promise';
import { config } from './index';

let connection: mysql.Connection | null = null;

export const connectToDatabase = async (): Promise<mysql.Connection> => {
  try {
    connection = await mysql.createConnection({
      host: config.database.host,
      port: config.database.port,
      user: config.database.username,
      password: config.database.password,
      database: config.database.database,
      charset: 'utf8mb4',
      timezone: '+00:00',
    });

    console.log('✅ MySQL database connected successfully');
    return connection;
  } catch (error) {
    console.error('❌ Error connecting to MySQL database:', error);
    throw error;
  }
};

export const getDatabaseConnection = (): mysql.Connection => {
  if (!connection) {
    throw new Error('Database connection not established. Call connectToDatabase() first.');
  }
  return connection;
};

export const closeDatabaseConnection = async (): Promise<void> => {
  if (connection) {
    await connection.end();
    connection = null;
    console.log('📚 MySQL database connection closed');
  }
};
