const pptr = require("puppeteer");
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
const schoolPortalOpt = require("../utils/schoolPortalOpt");
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
      const urlSchoolPortal = schoolPortalOpt(sch.id);

      const fileName = path.join(
        RES_JSON_DIR,
        `registrant-${sch.name.replace(/\s/g, "_")}-${
          sch.id
        }-${OPTION_TYPE}.json`
      );

      console.log(`Fetching: ${sch.name}`);
      const data = await req(url);
      const dataSchPortal = await req(urlSchoolPortal);
      console.log(`Fetched: ${sch.name}`);

      const quota = dataSchPortal.result.options.filter(
        (option) => option.type === OPTION_TYPE
      )[0].quota;

      fs.writeFileSync(fileName, JSON.stringify({ ...data, quota }, null, 2));
    }

    console.log("Selesai");

    await browser.close();
  } catch (e) {
    console.error(e);
  }
})();
