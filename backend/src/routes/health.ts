import { type Request, type Response, Router } from 'express';
import { getDatabaseConnection } from '../config/database';
import { getRedisConnection } from '../config/redis';

const router = Router();

interface HealthCheckResponse {
  status: 'ok' | 'error';
  timestamp: string;
  uptime: number;
  version: string;
  services: {
    database: 'connected' | 'disconnected' | 'error';
    redis: 'connected' | 'disconnected' | 'error';
  };
  message?: string;
}

// Basic health check
router.get('/', async (_req: Request, res: Response) => {
  const healthCheck: HealthCheckResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0',
    services: {
      database: 'disconnected',
      redis: 'disconnected',
    },
  };

  try {
    // Check database connection
    try {
      const db = getDatabaseConnection();
      await db.ping();
      healthCheck.services.database = 'connected';
    } catch (_dbError) {
      healthCheck.services.database = 'error';
      healthCheck.status = 'error';
    }

    // Check Redis connection
    try {
      const redis = getRedisConnection();
      await redis.ping();
      healthCheck.services.redis = 'connected';
    } catch (_redisError) {
      healthCheck.services.redis = 'error';
      healthCheck.status = 'error';
    }

    const statusCode = healthCheck.status === 'ok' ? 200 : 503;
    res.status(statusCode).json(healthCheck);
  } catch (_error) {
    healthCheck.status = 'error';
    healthCheck.message = 'Health check failed';
    res.status(503).json(healthCheck);
  }
});

// Database-specific health check
router.get('/database', async (_req: Request, res: Response) => {
  try {
    const db = getDatabaseConnection();
    await db.ping();
    res.json({ status: 'ok', service: 'database', timestamp: new Date().toISOString() });
  } catch (_error) {
    res.status(503).json({
      status: 'error',
      service: 'database',
      message: 'Database connection failed',
      timestamp: new Date().toISOString(),
    });
  }
});

// Redis-specific health check
router.get('/redis', async (_req: Request, res: Response) => {
  try {
    const redis = getRedisConnection();
    await redis.ping();
    res.json({ status: 'ok', service: 'redis', timestamp: new Date().toISOString() });
  } catch (_error) {
    res.status(503).json({
      status: 'error',
      service: 'redis',
      message: 'Redis connection failed',
      timestamp: new Date().toISOString(),
    });
  }
});

export { router as healthRoutes };
