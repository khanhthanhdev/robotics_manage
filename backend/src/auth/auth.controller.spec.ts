import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

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
});
