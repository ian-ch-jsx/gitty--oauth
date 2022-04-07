const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a user profile with a random quote', async () => {
    const res = await request(app)
      .post('/api/v1/profiles')
      .send({ username: 'Conor' });

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'Conor',
      quote: expect.any(String),
    });
  });
});
