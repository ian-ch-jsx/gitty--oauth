const { Router } = require('express');
const jwt = require('jsonwebtoken');
const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  })
  .get('/login/callback', (req, res) => {
    let current;
    exchangeCodeForToken(req.query.code)
      .then((token) => getGithubProfile(token))
      .then((githubProfile) => {
        current = githubProfile;
        GithubUser.findByUsername(githubProfile.login);
      })
      .then((user) => {
        if (!user)
          GithubUser.insert({
            username: current.login,
            avatar: current.avatar_url,
            email: current.email,
          })
            .then((user) =>
              jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
                expiresIn: '1 day',
              })
            )
            .then((payload) =>
              res
                .cookie(process.env.COOKIE_NAME, payload, {
                  httpOnly: true,
                  maxAge: 86400000,
                })
                .redirect('/api/v1/posts')
            );
      });
  })
  .delete('/session', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Logout successful.' });
  });
