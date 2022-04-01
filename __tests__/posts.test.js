const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const GithubUser = require('../lib/models/GithubUser');

jest.mock('../lib/middleware/authenticate.js', () => {
  return (req, res, next) => {
    req.user = {
      username: 'user',
      photoUrl: 'http://picture.com/profile.png',
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
    await GithubUser.insert({
      username: 'user',
      photoUrl: 'http://picture.com/profile.png',
    });

    return request(app)
      .post('/api/v1/posts')
      .send({ post: 'I like turtles' })
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          createdAt: expect.any(String),
          post: 'I like turtles',
          // username: 'user',
        });
      });
  });
  it('allows an authorized user to view posts', async () => {
    // NO USER
    // USER
  });
});
