const isUsingStealthPlugin = (browserInstance) => {
 return (browserInstance._process?.spawnargs || []).includes("--disable-blink-features=AutomationControlled");
};
const warnIfNotUsingStealth = (browserInstance) => {
 if (!browserInstance) {
   throw new Error("No or invalid browser instance provided.");
 }
 if (!isUsingStealthPlugin(browserInstance)) {
   console.warn("🚧 WARNING: You are using puppeteer without the stealth plugin.")
 }
};

// export functions
exports.isUsingStealthPlugin = isUsingStealthPlugin;
exports.warnIfNotUsingStealth = warnIfNotUsingStealth;
