const indexQuote = require("./interactors/index-quote.js");
const etfQuote = require("./interactors/etf-quote");

const InvestingScraper = {
  indexQuote, etfQuote
};

module.exports = InvestingScraper;

