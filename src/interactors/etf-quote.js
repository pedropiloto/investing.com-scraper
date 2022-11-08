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
const call = async (symbol, optionsGiven = {}) => {
  console.log('cenas', symbol)
  const optionsDefault = {
    debug: false,
    browserInstance: undefined,
  };
  const options = { ...optionsDefault, ...optionsGiven };
  const { debug, browserInstance } = options;
  const customPuppeteerProvided = Boolean(optionsGiven.browserInstance);
  
  // init browser
  let browser = browserInstance;
  if (!customPuppeteerProvided) {
    browser = await puppeteer.launch({
      headless: !debug, // when debug is true => headless should be false
      args: ['--start-maximized'],
    });
  }
  customPuppeteerProvided && warnIfNotUsingStealth(browser);
  
  const page = await browser.newPage();
  const url = `https://www.investing.com/etfs/${symbol}`;
  console.log('cenas2', url)
  await page.goto(url);

  try {
    return await readQuote(page)
  } catch (e) {
    console.log('Error Occurred', e)
  } finally {
    await browser.close()
  }

}

const readQuote = async (page) => {
  return await page.evaluate(() => {
    const quote = document.getElementById('last_last').innerHTML;
    let change = document.getElementsByClassName("pid-38423-pcp")
    return { quote, change: change[0].innerHTML }
  });
}

module.exports = call;

