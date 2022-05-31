const InvestingScraper = require("./src/index.js");

// switch on/off which function to demo
const demoRankings = true;

// which NFT project to scrape?
const symbol = "%5EGSPC";
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
    const index = await InvestingScraper.indexQuote("us-spx-500", options);
    console.log(index);
  }
})();

