const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/middleware/authenticate.js', () => {
  return (req, res, next) => {
    req.user = {
      username: 'user',
    };

    next();
  };
});

describe('gitty posts routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('allows an authorized user to create posts', async () => {
    request(app)
      .post('/api/v1/posts')
      .send({ post: 'I like turtles' })
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          createdAt: expect.any(String),
          post: 'I like turtles',
        });
      });
  });

  it('allows an authorized user to view posts', async () => {
    const agent = request.agent(app);

    const res = await agent.get('/api/v1/posts');

    expect(res.status).toEqual(401);
  });
});
