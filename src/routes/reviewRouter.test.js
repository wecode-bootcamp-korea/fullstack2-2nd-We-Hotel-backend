import { prisma } from '.prisma/client';
import request from 'supertest';
import app from '../app';

beforeEach(async () => {
  await prisma.review.deleteMany();
});

afterEach(async () => {
  await prisma.review.deleteMany();
});

describe('createReview', () => {
  test('create review', async () => {
    await request(app)
      .post('/review')
      .send({ email: 'asdf1@g.com', name: '김코드' })
      .expect(201, { message: 'REVIEW_CREATED' });
  });
});
