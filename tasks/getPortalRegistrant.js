const pptr = require("puppeteer");
const fs = require("fs");
const {
  EXPATH,
  SCH_NPSN,
  OPTION_TYPE,
  RESULT_DIR,
} = require("../lib/constant");
const registrantUrl = require("../utils/registrantUrl");
const { fetchNwrite } = require("../lib");

if (!fs.existsSync(RESULT_DIR)) fs.mkdirSync(RESULT_DIR);

(async () => {
  const browser = await pptr.launch({
    executablePath: EXPATH,
    headless: false,
  });

  try {
    const mainURL = registrantUrl(SCH_NPSN, OPTION_TYPE);

    const page = await browser.newPage();

    await fetchNwrite(
      page,
      mainURL,
      `registrant-${SCH_NPSN}-${OPTION_TYPE}.json`
    );
  } catch (e) {
    console.error(e);

    await browser.close();
  }
})();
