// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra');
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// load helper function to detect stealth plugin
const { warnIfNotUsingStealth } = require("../helpers/helper-functions");

/**
 * Scrapes index quote from https://investing.com
 * options = {
 *   nbrOfPages: number of pages that should be scraped? (defaults to 1 Page = top 100 collections)
 *   debug: [true,false] enable debugging by launching chrome locally (omit headless mode)
 *   browserInstance: browser instance created with puppeteer.launch() (bring your own puppeteer instance)
 * }
 */
const call = async (symbols, callback, delay = 10000, optionsGiven = {}) => {
  const optionsDefault = {
    debug: false,
    browserInstance: undefined,
  };
  const options = { ...optionsDefault, ...optionsGiven };
  const { debug, browserInstance, args } = options;
  const customPuppeteerProvided = Boolean(optionsGiven.browserInstance);

  // init browser
  let browser = browserInstance;
  if (!customPuppeteerProvided) {
    browser = await puppeteer.launch({
      headless: !debug, // when debug is true => headless should be false
      args: !!args ? args : ['--start-maximized'],
    });
  }
  // customPuppeteerProvided && warnIfNotUsingStealth(browser);

  for (const symbol of symbols) {
    const page = await browser.newPage();
    const url = `https://www.investing.com/indices/${symbol}`;
    await page.goto(url);

    readPageQuote(symbol, page, callback)
    setInterval(async () => {
      readPageQuote(symbol, page, callback)

    }, delay)
  }
}

const readPageQuote = async (symbol, page, callback) => {
  try {
    const quote = await readQuote(page)
    callback(symbol, quote)
  } catch (e) {
    console.log('Error Occurred', e)
  }
}

const readQuote = async (page) => {
  return await page.evaluate(() => {
    const quote = document.querySelector('[data-test="instrument-price-last"]').innerHTML;
    let change = document.querySelector('[data-test="instrument-price-change-percent"]').innerHTML;
    change = change.replace('(<!-- -->', '').replace('<!-- -->%)', '').replace('<!-- -->', '').replace('(', '').replace(')', '')
    return { quote, change }
  });
}

module.exports = call;

