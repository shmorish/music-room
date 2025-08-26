import Redis from 'ioredis';
import { config } from './index';

let redis: Redis | null = null;

export const connectToRedis = (): Redis => {
  try {
    redis = new Redis({
      host: config.redis.host,
      port: config.redis.port,
      password: config.redis.password || undefined,
      lazyConnect: true,
      maxRetriesPerRequest: 3,
    });

    redis.on('connect', () => {
      console.log('✅ Redis connected successfully');
    });

    redis.on('error', (error) => {
      console.error('❌ Redis connection error:', error);
    });

    redis.on('close', () => {
      console.log('📚 Redis connection closed');
    });

    return redis;
  } catch (error) {
    console.error('❌ Error creating Redis connection:', error);
    throw error;
  }
};

export const getRedisConnection = (): Redis => {
  if (!redis) {
    throw new Error('Redis connection not established. Call connectToRedis() first.');
  }
  return redis;
};

export const closeRedisConnection = async (): Promise<void> => {
  if (redis) {
    await redis.quit();
    redis = null;
    console.log('📚 Redis connection closed');
  }
};
