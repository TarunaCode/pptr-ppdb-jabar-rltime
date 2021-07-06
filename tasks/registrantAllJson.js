const pptr = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const {
  EXPATH,
  UDDIR,
  OPTION_TYPE,
  RES_JSON_DIR,
  INFO_DIR,
  TYPE,
  LEVEL,
  CITY,
} = require("../lib/constant");
const registrantUrl = require("../utils/registrantUrl");
const { requestWrapper } = require("../lib");

const city = CITY.replace(/\s/g, "_");
const filePath = path.join(INFO_DIR, `schools-${city}-${TYPE}-${LEVEL}.json`);

const schools = JSON.parse(fs.readFileSync(filePath, "utf8"));

if (!fs.existsSync(RES_JSON_DIR)) fs.mkdirSync(RES_JSON_DIR);

(async () => {
  try {
    const browser = await pptr.launch({
      executablePath: EXPATH,
      userDataDir: UDDIR,
      // headless: false,
    });
    console.log("Puppeteer spawned");

    const page = await browser.newPage();
    const req = requestWrapper(page);

    console.log("Memulai mengambil data");

    for (const sch of schools) {
      const url = registrantUrl(sch.id, OPTION_TYPE);
      const fileName = path.join(
        RES_JSON_DIR,
        `registrant-${sch.name.replace(/\s/g, "_")}-${
          sch.id
        }-${OPTION_TYPE}.json`
      );

      console.log(`Fetching: ${sch.name}`);
      const data = await req(url);
      console.log(`Fetched: ${sch.name}`);

      fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    }

    console.log("Selesai");

    await browser.close();
  } catch (e) {
    console.error(e);
  }
})();
