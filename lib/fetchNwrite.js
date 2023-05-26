const fs = require("fs");
const path = require("path");
const { RESULT_DIR } = require("./constant");

const sleep = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

module.exports = async function fetchNwrite(page, url, filename) {
  if (!fs.existsSync(RESULT_DIR)) fs.mkdirSync(RESULT_DIR);

  while (true) {
    await page.goto(url, { timeout: 0 });
    const data = JSON.parse(await page.$eval("*", (el) => el.innerText));

    const file = path.join(RESULT_DIR, filename);

    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    console.log(`Writed file ${filename} - ${new Date().toLocaleTimeString()}`);

    await sleep(2500);
  }
};
