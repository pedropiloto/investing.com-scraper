const axios = require("axios");
const cheerio = require("cheerio");

const fetchQuote = async (symbol) => {
  const type = symbol.type === "etf" ? "etfs" : "indices";
  const url = `https://www.investing.com/${type}/${symbol.ticker}`;
  
  const res = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
    }
  });

  const $ = cheerio.load(res.data);

  const quote = $('[data-test="instrument-price-last"]').text().trim();
  let change = $('[data-test="instrument-price-change-percent"]').text().trim();

  change = change.replace(/[()%+]/g, "").trim();

  return { quote, change };
};

// polling loop
const loop = async (symbols, callback, delay = 60000) => {
  while (true) {
    for (const symbol of symbols) {
      try {
        const data = await fetchQuote(symbol);
        callback(symbol, data);
      } catch (e) {
        console.error("Error fetching", symbol, e);
      }
    }
    await new Promise(r => setTimeout(r, delay));
  }
};

module.exports = loop;
