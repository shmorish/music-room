import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from '../config';

export const setupMiddleware = (app: express.Application): void => {
  // Security middleware
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:'],
        },
      },
    })
  );

  // CORS middleware
  app.use(
    cors({
      origin:
        config.nodeEnv === 'development'
          ? ['http://localhost:3000', 'http://localhost:8081'] // React Native Metro bundler
          : [], // Configure for production
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // Logging middleware
  app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Request timestamp middleware
  app.use((req, _res, next) => {
    req.requestTime = Date.now();
    next();
  });
};
