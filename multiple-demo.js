const pidtree = require("pidtree");
const pidusage = require("pidusage");

const InvestingScraper = require("./src/index.js");

const symbols = [
  { ticker: "us-spx-500", type: "index" },
  { ticker: "nq-100", type: "index" },
  { ticker: "ishares-msci-world---acc", type: "etf" },
  { ticker: "ishares-msci-world---acc?cid=47285", type: "etf" },
  { ticker: "vanguard-ftse-all-world-ucits-acc", type: "etf" },
];
const options = {
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
}

console.log(`===>>> ${symbols} <<<===`);
console.log("OPTIONS:");
console.log(options);

(async () => {
  InvestingScraper.multipleQuoteV2(symbols, (symbol, quote) => { console.log(symbol, quote) }, 10000, options);
})();

setInterval(async () => {
  try {
    const parentPid = process.pid;

    // get parent + all children
    const pids = await pidtree(parentPid, { root: true });

    // get usage for all PIDs
    const stats = await pidusage(pids);

    let totalCpu = 0;
    let totalMem = 0;

    for (const pid of Object.keys(stats)) {
      totalCpu += stats[pid].cpu;        // %
      totalMem += stats[pid].memory;     // bytes
    }

    console.log(
      "CPU:", totalCpu.toFixed(2) + "%",
      "Memory:", (totalMem / 1024 / 1024).toFixed(2) + " MB"
    );

  } catch (err) {
    console.error("Error getting usage:", err);
  }
}, 5000);
