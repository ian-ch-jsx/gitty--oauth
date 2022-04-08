const fetch = require('cross-fetch');

module.exports = class Quotes {
  static getQuotes() {
    const apiArray = [
      'https://programming-quotes-api.herokuapp.com/quotes/random',
      'https://futuramaapi.herokuapp.com/api/quotes/1',
      'https://api.quotable.io/random',
    ];

    const apiFetches = apiArray.map((api) => fetch(api));

    return Promise.all(apiFetches)
      .then((result) => {
        return Promise.all(result.map((item) => item.json()));
      })
      .then((quotes) =>
        quotes.map((quote) => {
          if (quote.success) {
            return {
              content: quote.contents.quotes[0].quote,
              author: quote.contents.quotes[0].author,
            };
          } else if (quote.author) {
            return {
              content: quote.content || quote.en,
              author: quote.author,
            };
          } else {
            return {
              content: 'error',
              author: 'error',
            };
          }
        })
      );
  }
};
