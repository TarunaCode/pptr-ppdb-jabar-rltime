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
const { requestWrapper, fetchNwrite } = require("../lib");

const registrantUrl = (schoolID, option_type) =>
  `https://api.ppdb.disdik.jabarprov.go.id/portal/registrant?pagination=false&orderby=created_at&order=asc&search=&columns[0][key]=name&columns[0][searchable]=true&columns[1][key]=registration_number&columns[1][searchable]=true&filters[0][key]=first_choice_school&filters[0][value]=${schoolID}&filters[1][key]=option_type&filters[1][value]=${option_type}`;

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
