const InvestingScraper = require("./src/index.js");


// which NFT project to scrape?
const indexSymbols = ["us-spx-500", "nq-100"];
const etfSymbols = ["ishares-msci-world---acc", "ishares-msci-world---acc?cid=47285", "vanguard-ftse-all-world-ucits-acc"];
const options = {
  debug: false,
  browserInstance: undefined,
}
console.log(`===>>> ${indexSymbols} <<<===`);
console.log("OPTIONS:");
console.log(options);

(async () => {
  InvestingScraper.multipleIndexQuote(indexSymbols, (symbol, quote) => { console.log(symbol, quote) }, 10000, options);
})();

console.log(`===>>> ${etfSymbols} <<<===`);
console.log("OPTIONS:");
console.log(options);

(async () => {
  InvestingScraper.multipleEtfQuote(etfSymbols, (symbol, quote) => { console.log(symbol, quote) }, 10000, options);
})();

