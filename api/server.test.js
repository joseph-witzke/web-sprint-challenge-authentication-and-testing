const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db('users').truncate();
});

afterAll(async () => {
  await db.destroy();
});

test('sanity', () => {
  expect(true).toBe(true);
});

test('checking env', () => {
  expect(process.env.NODE_ENV).toBe('testing');
});

describe('[POST] /register', () => {
  it('returns a status 201', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'joe', password: '1234' });
    expect(res.status).toBe(201);
  });
  it('returns newly created user', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'joe', password: '1234' });
    expect(res.body).toMatchObject({
      id: 1,
      username: 'joe',
      password: 'hashed password',
    });
  });
});

describe('[POST] /login', () => {
  it('returns a status 401', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'joe', password: '1234' });
    expect(res.status).toBe(401);
  });
  it('returns error message', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'joe', password: '' });
    expect(res.status).toBe(401);
  });
});
