const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('backend-gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('allows an authorized user to create posts', async () => {
    const agent = request.agent(app);

    await agent.get('/api/v1/auth/login/callback');

    return agent
      .post('/api/v1/posts')
      .send({ post: 'test post' })
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          createdAt: expect.any(String),
          post: 'test post',
        });
      });
  });

  it('allows an authorized user to view posts', async () => {
    const agent = request.agent(app);

    await agent.get('/api/v1/auth/login/callback?code=MOCK_CODE').redirects(1);

    const response = await agent.get('/api/v1/posts');

    expect(response.body).toEqual([
      {
        createdAt: expect.any(String),
        id: expect.any(String),
        post: 'I wish I could have, like, 400 kittens.',
      },
      {
        createdAt: expect.any(String),
        id: expect.any(String),
        post: 'We only have one more week of instruction and Im gonna vomit!',
      },
      {
        createdAt: expect.any(String),
        id: expect.any(String),
        post: 'Dont get excited, Trump, youre preemtively banned here, too',
      },
    ]);
  });
});
