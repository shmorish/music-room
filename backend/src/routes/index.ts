import { Router } from 'express';
import { healthRoutes } from './health';

const router = Router();

// Health check routes
router.use('/health', healthRoutes);

// API versioning
router.use('/api/v1', (_req, res) => {
  res.json({
    message: 'Music Room API v1',
    version: '1.0.0',
    status: 'active',
    timestamp: new Date().toISOString(),
  });
});

export { router as routes };
