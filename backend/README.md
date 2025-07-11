# Smart Dormitory Management System - Backend

This is the backend API for the Smart Dormitory Management System built with Node.js, Express, and SQLite.

## Features

- RESTful API endpoints for dormitory management
- SQLite database with better-sqlite3 for data persistence
- JWT authentication ready structure
- Comprehensive error handling
- CORS enabled for frontend integration
- Security middleware with Helmet
- Request logging with Morgan
- Comprehensive test suite with Jest

## Database Schema

The system includes the following main entities:

- **Users**: Authentication and user management
- **Tenants**: Tenant information and profiles
- **Rooms**: Room management and availability
- **Bills**: Billing and payment tracking

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`:
   ```
   DB_PATH=./data/database.sqlite
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=24h
   PORT=3000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   ```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Testing
```bash
npm test
```

### Linting
```bash
npm run lint
```

## API Endpoints

### General
- `GET /` - API information
- `GET /health` - Health check

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user

### Tenants
- `GET /api/tenants` - Get all tenants
- `POST /api/tenants` - Create new tenant

### Rooms
- `GET /api/rooms` - Get all rooms
- `POST /api/rooms` - Create new room

### Bills
- `GET /api/bills` - Get all bills
- `POST /api/bills` - Create new bill

## Project Structure

```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── jest.config.js     # Jest testing configuration
├── .eslintrc.js       # ESLint configuration
├── tests/             # Test files
│   ├── setup.js       # Test setup
│   └── server.test.js # Server tests
├── data/              # SQLite database files (auto-created)
└── README.md          # This file
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DB_PATH | SQLite database file path | ./data/database.sqlite |
| JWT_SECRET | Secret key for JWT tokens | - |
| JWT_EXPIRES_IN | JWT token expiration time | 24h |
| PORT | Server port | 3000 |
| NODE_ENV | Environment mode | development |
| CORS_ORIGIN | Allowed CORS origin | http://localhost:5173 |

## Testing

The project includes comprehensive tests covering:
- API endpoints
- Database operations
- Error handling
- Health checks

Tests use an in-memory SQLite database to avoid affecting the development database.

## Security Features

- Helmet.js for security headers
- CORS configuration
- Input validation ready structure
- JWT authentication preparation
- Environment-based configuration

## Development Notes

- The database is automatically created with proper schema on first run
- All database operations use prepared statements for security
- Graceful shutdown handling for database connections
- Comprehensive error handling and logging 