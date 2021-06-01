const fs = require("fs");
const path = require("path");
const { RESULT_DIR } = require("./constant");

async function fetchNwrite(req, url, headers, filename) {
  if (!fs.existsSync(RESULT_DIR)) fs.mkdirSync(RESULT_DIR);

  await setInterval(async () => {
    const data = await req(url, "GET", { headers });
    const file = path.join(RESULT_DIR, filename);

    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    console.log(`Writed file ${filename} - ${new Date().toLocaleTimeString()}`);
  }, 2500);
}

module.exports = fetchNwrite;
