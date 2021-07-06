const pptr = require("puppeteer-core");
const path = require("path");
const fs = require("fs");
const {
  EXPATH,
  UDDIR,
  SCH_ID,
  OPTION_TYPE,
  RESULT_DIR,
} = require("../lib/constant");
const registrantUrl = require("../utils/registrantUrl");
const { requestWrapper, fetchNwrite } = require("../lib");

if (!fs.existsSync(RESULT_DIR)) fs.mkdirSync(RESULT_DIR);

(async () => {
  try {
    const mainURL = registrantUrl(SCH_ID, OPTION_TYPE);

    const browser = await pptr.launch({
      executablePath: EXPATH,
      userDataDir: UDDIR,
      // headless: false,
    });

    const page = await browser.newPage();
    const req = requestWrapper(page);

    await fetchNwrite(
      req,
      mainURL,
      {},
      `registrant-${SCH_ID}-${OPTION_TYPE}.json`
    );
  } catch (e) {
    console.error(e);
  }
})();
