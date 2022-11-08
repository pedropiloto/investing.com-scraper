const InvestingScraper = require("./src/index.js");

// switch on/off which function to demo
const demoRankings = true;

// which NFT project to scrape?
const symbol = "us-spx-500";
const options = {
  debug: false,
  browserInstance: undefined,
}
console.log(`===>>> ${symbol} <<<===`);
console.log("OPTIONS:");
console.log(options);

(async () => {
  if (demoRankings) {
    console.log(`\n\n\n\n✅ === InvestingScraper.indexQuote() ===`);
    const index = await InvestingScraper.indexQuote(symbol, options);
    console.log(index);
    const etf = await InvestingScraper.etfQuote('ishares-msci-world---acc', options);
    console.log(etf);
  }
})();

