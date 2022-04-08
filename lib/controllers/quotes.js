const { Router } = require('express');
const Quotes = require('../services/quotes');

module.exports = Router().get('/', (req, res) => {
  Quotes.getQuotes({
    ...req.body,
  }).then((quote) => res.send(quote));
});
