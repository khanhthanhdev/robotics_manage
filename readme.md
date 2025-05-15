# Robotics Tournament Management System

A comprehensive solution for managing robotics tournaments, including team management, match scheduling, scoring, and real-time updates.

## Documentation

For detailed documentation, refer to the docs directory or visit:
https://deepwiki.com/khanhthanhdev/robotics_manage/3.2-websocket-service

## System Requirements

- Node.js (v18 or higher)
- PNPM or NPM
- PostgreSQL database

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or 
   pnpm install
   ```

3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

4. Create a `.env` file in the backend directory with the following content (adjust as needed):
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/robotics_db"
   JWT_SECRET="your-secret-key"
   ```

5. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

6. Start the backend development server:
   ```bash
   npm run start:dev
   # or
   pnpm run start:dev
   ```

The backend server will start on http://localhost:3000 by default.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Create a `.env.local` file in the frontend directory with:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

The frontend will be accessible at http://localhost:3001 by default.

## Features

- User authentication and role-based access control
- Tournament and stage management
- Team registration and management
- Match scheduling and scoring
- Real-time updates via WebSockets
- Automated Swiss tournament scheduling
- Statistics and rankings

## Project Structure

- `/backend` - NestJS backend application
- `/frontend` - Next.js frontend application
- `/docs` - Documentation files

## License

[Your license here]

