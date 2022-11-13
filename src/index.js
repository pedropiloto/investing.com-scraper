const indexQuote = require("./interactors/index-quote.js");
const multipleIndexQuote = require("./interactors/multiple-index-quote");
const multipleEtfQuote = require("./interactors/multiple-etf-quote");
const etfQuote = require("./interactors/etf-quote");

const InvestingScraper = {
  indexQuote, multipleIndexQuote, etfQuote, multipleEtfQuote
};

module.exports = InvestingScraper;

