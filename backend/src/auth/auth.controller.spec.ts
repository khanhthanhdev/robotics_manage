import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from './auth.module';
import { PrismaService } from '../prisma.service';
import * as cookieParser from 'cookie-parser';

// Increase Jest timeout for slow e2e tests
jest.setTimeout(30000);

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    app.use(cookieParser());
    await app.init();

    prisma = app.get(PrismaService);
    // Clean up dependent tables first
    await prisma.tournament.deleteMany({});
    // Now clean up users table
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth/register (POST)', () => {
    it('should register a new user', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ username: 'testuser', password: 'testpass', email: 'test@example.com' })
        .expect(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.username).toBe('testuser');
      expect(res.body).not.toHaveProperty('password');
    });

    it('should not allow duplicate usernames', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({ username: 'testuser', password: 'testpass2' })
        .expect(409);
    });
  });

  describe('/auth/login (POST)', () => {
    it('should login with correct credentials and set cookie', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'testuser', password: 'testpass' })
        .expect(201);
      expect(res.body).toHaveProperty('user');
      expect(res.body.user.username).toBe('testuser');
      expect(res.headers['set-cookie']).toBeDefined();
    });

    it('should not login with wrong credentials', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'testuser', password: 'wrongpass' })
        .expect(401);
    });
  });

  describe('/auth/logout (POST)', () => {
    it('should clear the token cookie on logout', async () => {
      // First, login to get a cookie
      const loginRes = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'testuser', password: 'testpass' });
      const cookie = loginRes.headers['set-cookie'];
      const res = await request(app.getHttpServer())
        .post('/auth/logout')
        .set('Cookie', cookie)
        .expect(201);
      expect(res.body).toEqual({ message: 'Logged out' });
      // Should clear the cookie
      if (Array.isArray(res.headers['set-cookie'])) {
        expect(res.headers['set-cookie'].join(';')).toMatch(/token=;/);
      } else {
        expect(res.headers['set-cookie']).toMatch(/token=;/);
      }
    });
  });

  describe('/auth/check-auth (GET)', () => {
    it('should return authenticated user with valid token', async () => {
      const loginRes = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'testuser', password: 'testpass' });
      const cookie = loginRes.headers['set-cookie'];
      const res = await request(app.getHttpServer())
        .get('/auth/check-auth')
        .set('Cookie', cookie)
        .expect(200);
      expect(res.body.authenticated).toBe(true);
      expect(res.body.user).toHaveProperty('username', 'testuser');
      expect(res.body.message).toMatch(/authentication is working/i);
    });
    it('should reject if no token is provided', async () => {
      await request(app.getHttpServer())
        .get('/auth/check-auth')
        .expect(401);
    });
  });

  describe('/auth/check-admin (GET)', () => {
    it('should return admin access for admin user', async () => {
      // Create admin user
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({ username: 'admin', password: 'adminpass', role: 'ADMIN' });
      const loginRes = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'admin', password: 'adminpass' });
      const cookie = loginRes.headers['set-cookie'];
      const res = await request(app.getHttpServer())
        .get('/auth/check-admin')
        .set('Cookie', cookie)
        .expect(200);
      expect(res.body.authenticated).toBe(true);
      expect(res.body.role).toBe('ADMIN');
      expect(res.body.hasAdminAccess).toBe(true);
      expect(res.body.message).toMatch(/ADMIN role is working/i);
    });
    it('should reject non-admin user', async () => {
      const loginRes = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'testuser', password: 'testpass' });
      const cookie = loginRes.headers['set-cookie'];
      await request(app.getHttpServer())
        .get('/auth/check-admin')
        .set('Cookie', cookie)
        .expect(403);
    });
    it('should reject if not authenticated', async () => {
      await request(app.getHttpServer())
        .get('/auth/check-admin')
        .expect(401);
    });
  });

  describe('/auth/init-admin (GET)', () => {
    it('should initialize a default admin', async () => {
      const res = await request(app.getHttpServer())
        .get('/auth/init-admin')
        .expect(201);
      if (res.body.username && res.body.role) {
        expect(res.body).toHaveProperty('username');
        expect(res.body.role).toBe('ADMIN');
      } else {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toMatch(/admin user already exists/i);
      }
    });
  });
});
