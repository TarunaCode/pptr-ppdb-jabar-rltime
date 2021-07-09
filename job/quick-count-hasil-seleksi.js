const path = require("path");
const fs = require("fs");

const {
  OPTION_TYPE,
  RES_JSON_DIR,
  INFO_DIR,
  TYPE,
  LEVEL,
  CITY,
} = require("../lib/constant");

const city = CITY.replace(/\s/g, "_");
const filePath = path.join(INFO_DIR, `schools-${city}-${TYPE}-${LEVEL}.json`);

const schools = JSON.parse(fs.readFileSync(filePath, "utf8"));

let parsedData = [];

for (const sch of schools) {
  const fileName = `registrant-${sch.name.replace(/\s/g, "_")}-${
    sch.id
  }-${OPTION_TYPE}.json`;

  const data = JSON.parse(fs.readFileSync(path.join(RES_JSON_DIR, fileName)));
  const sortedData = {
    school: sch.name,
    data: data.result.itemsList.sort((a, b) => {
      switch (OPTION_TYPE) {
        case "prestasi-rapor":
          return b.score - a.score;
        case "ketm":
        case "zonasi":
          return a.distance1 - b.distance1;
      }
    }),
  };

  parsedData.push({ ...sortedData, quota: data.quota });
}

// fs.writeFileSync("./data-sorted.json", JSON.stringify(parsedData, null, 2));
