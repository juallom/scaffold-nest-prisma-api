import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import supertest from 'supertest';
import { AppModule } from '#/app.module.js';
import { PrismaService } from '#/prisma/prisma.service.js';

const prismaService = vi.fn();

describe('AppController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return supertest(app.getHttpServer()).get('/').expect(404);
  });
});
