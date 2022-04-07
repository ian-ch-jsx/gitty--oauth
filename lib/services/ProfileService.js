const fetch = require('cross-fetch'); // import fetch from 'cross-fetch'
const Profile = require('../models/Profile');

module.exports = class ProfileService {
  static create(username) {
    // const resp = await fetch('https://futuramaapi.herokuapp.com/api/quotes/1');
    // const data = await resp.json();
    // const profile = await Profile.insert({
    //   username,
    //   quote: data[0].quote,
    // });

    // return profile;
    // fetch quotes
    fetch('https://futuramaapi.herokuapp.com/api/quotes/1').then((res) => {
      if (res.ok) return res.json();
      else
        throw new Error('Not logged in').then(
          Profile.insert({ username, quote: 'k.' })
        );
    });
  }
};
