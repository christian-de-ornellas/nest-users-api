import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { faker } from '@faker-js/faker';

describe('TaskController (e2e)', () => {
  let app: INestApplication<App>;
  let createdUserId: string;

  const fakeUser = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /users → Criar usuário', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(fakeUser)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(fakeUser.name);
    createdUserId = response.body.id;
  });

  it('GET /users → Lista de usuários', async () => {
    await request(app.getHttpServer()).get('/users').expect(200);
  });

  it('GET /users/:id → Listar de usuário por id', async () => {
    await request(app.getHttpServer())
      .get(`/users/${createdUserId}`)
      .expect(200);
  });

  it('DELETE /users/:id → Removendo usuário', async () => {
    await request(app.getHttpServer())
      .delete(`/users/${createdUserId}`)
      .expect(204);
  });
});
