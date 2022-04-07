const fetch = require('cross-fetch');

function quotes() {
  const apiArray = [
    'https://programming-quotes-api.herokuapp.com/quotes/random',
    'https://quotes.rest/qod?language=en',
    'https://api.quotable.io/random',
  ];

  const apiFetches = apiArray.map((api) => fetch(api));

  return Promise.all(apiFetches)
    .then((result) => {
      return Promise.all(result.map((item) => item.json()));
    })
    .then((data) => console.log('datamungehere', data));
}

console.log('quotes()', quotes());
