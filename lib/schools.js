const { INFO_DIR } = require("./constant");
const path = require("path");
const fs = require("fs");

let data = [];

const schools = fs
  .readdirSync(INFO_DIR)
  .filter((sch) => sch.includes("schools"));

schools.forEach((filename) => {
  const content = fs.readFileSync(path.join(INFO_DIR, filename), "utf8");
  const parsed = JSON.parse(content);

  parsed.forEach((info) => {
    data.push(info);
  });
});

module.exports = data;
