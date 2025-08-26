import mysql from 'mysql2/promise';
import { config } from './index';

let pool: mysql.Pool | null = null;

export const createDatabasePool = (): mysql.Pool => {
  if (!pool) {
    pool = mysql.createPool({
      host: config.database.host,
      port: config.database.port,
      user: config.database.username,
      password: config.database.password,
      database: config.database.database,
      charset: 'utf8mb4',
      timezone: '+00:00',
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log('✅ MySQL connection pool created successfully');
  }
  return pool;
};

export const connectToDatabase = async (): Promise<mysql.Pool> => {
  try {
    const dbPool = createDatabasePool();
    // Test connection
    const connection = await dbPool.getConnection();
    connection.release();
    console.log('✅ MySQL database pool connected successfully');
    return dbPool;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown database error';
    console.error('❌ Error connecting to MySQL database:', errorMsg);
    throw new Error(`Database connection failed: ${errorMsg}`);
  }
};

export const getDatabasePool = (): mysql.Pool => {
  if (!pool) {
    throw new Error('Database pool not established. Call connectToDatabase() first.');
  }
  return pool;
};

export const closeDatabaseConnection = async (): Promise<void> => {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('📚 MySQL database connection pool closed');
  }
};
