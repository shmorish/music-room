import request from 'supertest';
import express from 'express';
import { healthRoutes } from '../../src/routes/health';

const app = express();
app.use('/health', healthRoutes);

describe('Health Check Endpoints', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('services');
      expect(response.body.services).toHaveProperty('database');
      expect(response.body.services).toHaveProperty('redis');
    });
  });

  describe('GET /health/database', () => {
    it('should return database health status', async () => {
      const response = await request(app)
        .get('/health/database')
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('service', 'database');
      expect(response.body).toHaveProperty('timestamp');
      expect(['ok', 'error']).toContain(response.body.status);
    });
  });

  describe('GET /health/redis', () => {
    it('should return redis health status', async () => {
      const response = await request(app)
        .get('/health/redis')
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('service', 'redis');
      expect(response.body).toHaveProperty('timestamp');
      expect(['ok', 'error']).toContain(response.body.status);
    });
  });
});