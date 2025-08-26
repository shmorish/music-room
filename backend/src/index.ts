import express from 'express';
import { config } from './config';
import { closeDatabaseConnection, connectToDatabase } from './config/database';
import { closeRedisConnection, connectToRedis } from './config/redis';
import { setupMiddleware } from './middleware';
import { routes } from './routes';

const app = express();

// Setup middleware
setupMiddleware(app);

// Setup routes
app.use('/', routes);

// Global error handler
app.use(
  (error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Global error handler:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: config.nodeEnv === 'development' ? error.message : 'Something went wrong',
      timestamp: new Date().toISOString(),
    });
  }
);

// 404 handler
app.use('*', (req: express.Request, res: express.Response) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString(),
  });
});

const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectToDatabase();

    // Connect to Redis
    const redis = connectToRedis();
    try {
      await redis.connect();
      console.log('✅ Redis connected successfully');
    } catch (error) {
      console.error('❌ Failed to connect to Redis:', error);
      throw error;
    }

    // Start the server
    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
      console.log(`📡 Environment: ${config.nodeEnv}`);
      console.log(`🔗 Health check: http://localhost:${config.port}/health`);
      console.log(`📚 API: http://localhost:${config.port}/api/v1`);
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('🛑 SIGTERM received, shutting down gracefully...');
      await closeDatabaseConnection();
      await closeRedisConnection();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      console.log('🛑 SIGINT received, shutting down gracefully...');
      await closeDatabaseConnection();
      await closeRedisConnection();
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
