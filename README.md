# Investing.com Scraper

## Install

```bash
npm install investing.com-scraper
```

## Usage

ℹ **`symbol`** is the human readable identifier that investing uses to identify an index.

ℹ **`options`** is an object with the following keys
- **`debug`** [Boolean] launches chromium locally, omits headless mode (default: `false`)
- **`browserInstance`** [PuppeteerBrowser]: bring your own browser instance for more control

```js
const InvestingScraper = require("investing-scraper");

// which index to scrape?
const symbol = "%5EGSPC";

// options
const options = {
  debug: false,
  browserInstance: undefined,
}

// get index quote
const indexQuote = await InvestingScraper.indexQuote(symbol);

```

### Bring your own puppeteer

if you want to customize the settings for your puppeteer instance you can add your own puppeteer browser instance in the options.

```js
const puppeteer = require('puppeteer-extra');
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const myPuppeteerInstance = await puppeteer.launch(myCustomSettings);

const result = await InvestingScraper.indexQuote("%5EGSPC", {
  browserInstance: myPuppeteerInstance
});
```

## Demo

```bash
npm run demo
```

## Contribute

Open PR or issue if you would like to have more features added.