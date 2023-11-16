const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report.js");
async function main() {
  //checking the command line arguments passed
  if (process.argv.length < 3) {
    console.log("no website preovided");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("tto many command line args");
    process.exit(1);
  }
  const baseURL = process.argv[2];
  console.log(`starting crawl of: ${baseURL}`);
  const pages = await crawlPage(baseURL, baseURL, {});
  printReport(pages);
}
main();
