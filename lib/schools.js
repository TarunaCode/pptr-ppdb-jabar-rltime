const { INFO_DIR } = require("./constant");
const path = require("path");
const fs = require("fs");

if (!fs.existsSync(INFO_DIR)) fs.mkdirSync(INFO_DIR);

const schools = fs
  .readdirSync(INFO_DIR)
  .filter((sch) => sch.startsWith("schools"));

module.exports = schools
  .map((filename) => {
    const content = fs.readFileSync(path.join(INFO_DIR, filename), "utf8");

    return JSON.parse(content);
  })
  .reduce((curr, acc) => curr.concat(acc));
