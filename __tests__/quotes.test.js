const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('quotes routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  it('fetches a random quote', async () => {
    const expected = [
      { content: expect.any(String), author: expect.any(String) },
      { content: expect.any(String), author: expect.any(String) },
      { content: expect.any(String), author: expect.any(String) },
    ];
    const res = await request(app).get('/api/v1/quotes');
    expect(res.body).toEqual(expected);
  });
});
