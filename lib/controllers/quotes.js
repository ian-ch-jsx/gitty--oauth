const { Router } = require('express');
const Quotes = require('../services/QuoteFetch');

module.exports = Router().get('/', (req, res) => {
  Quotes.getQuotes({
    ...req.body,
  }).then((quote) => res.send(quote));
});
