const multipleQuoteV1 = require("./interactors/multiple-quote-v1.js");
const multipleQuoteV2 = require("./interactors/multiple-quote-v2.js");

const InvestingScraper = {
  multipleQuoteV1, // puppeteer based
  multipleQuoteV2, // axios + cheerio based
};

module.exports = InvestingScraper;

