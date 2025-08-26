# Music Room Backend

Node.js TypeScript backend for the Music Room application, built with Express.js, MySQL, and Redis.

## Features

- 🚀 Express.js with TypeScript
- 🗄️ MySQL database with connection management
- ⚡ Redis for caching and real-time features
- 🔒 Security middleware (Helmet, CORS)
- 📝 Request logging with Morgan
- 🏥 Health check endpoints
- 🔧 Development tools (Nodemon, Biome)

## Prerequisites

- Node.js 18+
- MySQL 8.0+
- Redis 6.0+

## Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your database and Redis credentials.

## Development

Start the development server:
```bash
npm run dev
```

The server will run on http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run linting
- `npm run format` - Format code
- `npm run type-check` - Check TypeScript types
- `npm run ci` - Run all checks (lint + format + types)

## API Endpoints

### Health Checks
- `GET /health` - Overall health check
- `GET /health/database` - Database connection check
- `GET /health/redis` - Redis connection check

### API
- `GET /api/v1` - API version info

## Environment Variables

See `.env.example` for all available environment variables.

Key variables:
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE` - MySQL config
- `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD` - Redis config

## Database Setup

1. Create MySQL database:
```sql
CREATE DATABASE music_room_dev;
CREATE USER 'music_room_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON music_room_dev.* TO 'music_room_user'@'localhost';
```

2. Update `.env` with your database credentials.

## Project Structure

```
src/
├── config/         # Configuration files
├── middleware/     # Express middleware
├── routes/         # API routes
├── services/       # Business logic
├── types/          # TypeScript types
└── utils/          # Utility functions
```

## Development Notes

- Uses Biome for fast linting and formatting
- TypeScript strict mode enabled
- Graceful shutdown handling
- Comprehensive error handling
- Request/response logging