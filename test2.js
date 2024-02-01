const puppeteer = require("puppeteer");
const fs = require("fs");

async function runBot() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

    await page.goto(
      "https://www.paxit.ir/_next/data/kBPYQxsnEpssJGGz75ErS/streamers.json"
    );

    await page.waitForSelector("body");

    const copiedText = await page.evaluate(() => {
      return document.querySelector("body").innerText;
    });

    jsonText = JSON.parse(copiedText);

    fs.writeFileSync("db.json", JSON.stringify(jsonText.pageProps.streamers));

    console.log("Data updated!");


  await browser.close();
}

runBot();





