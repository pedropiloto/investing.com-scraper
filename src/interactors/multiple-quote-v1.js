const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const call = async (symbols, callback, delay = 60000, optionsGiven = {}) => {
  const optionsDefault = {
    debug: false,
    browserInstance: undefined,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--disable-background-networking",
      "--disable-extensions",
      "--disable-sync",
      "--metrics-recording-only",
      "--mute-audio",
      "--no-default-browser-check",
    ],
  };
  const options = { ...optionsDefault, ...optionsGiven };
  const { debug, browserInstance, args } = options;
  const customPuppeteerProvided = Boolean(browserInstance);

  // init browser
  let browser = browserInstance;
  if (!customPuppeteerProvided) {
    browser = await puppeteer.launch({
      headless: debug ? false : "new",
      args,
    });
  }

  const page = await browser.newPage();

  while (true) {
    for (const symbol of symbols) {
      try {
        const type = symbol['type'] === 'etf' ? 'etfs' : 'indices';
        const url = `https://www.investing.com/${type}/${symbol['ticker']}`;

        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

        const data = await readQuote(page);
        if (data) callback(symbol, data);

      } catch (e) {
        console.error("Error scraping", symbol, e);
      }
    }

    // wait before looping again
    await new Promise(r => setTimeout(r, delay));
  }
};

const readQuote = async (page) => {
  return await page.evaluate(() => {
    const quoteEl = document.querySelector('[data-test="instrument-price-last"]');
    const changeEl = document.querySelector('[data-test="instrument-price-change-percent"]');
    if (!quoteEl || !changeEl) return null;

    const quote = quoteEl.textContent.trim();
    let change = changeEl.textContent.trim();

    change = change.replace(/[()%+]/g, "").replace("<!-- -->", "").trim();

    return { quote, change };
  });
};

module.exports = call;
