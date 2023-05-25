const pptr = require("puppeteer-core");
const path = require("path");
const fs = require("fs");
const {
  CITY,
  TYPE,
  LEVEL,
  EXPATH,
  UDDIR,
  INFO_DIR,
} = require("../lib/constant");

const schoolLists = (city, type, level) =>
  `https://api.ppdb.jabarprov.go.id/portal/school?pagination=false&filters[0][key]=address_city&filters[0][value]=${encodeURI(
    city.toUpperCase().trim()
  )}&filters[1][key]=type&filters[1][value]=${type
    .toLowerCase()
    .trim()}&filters[2][key]=level&filters[2][value]=${level
    .toLowerCase()
    .trim()}`;

if (!fs.existsSync(INFO_DIR)) fs.mkdirSync(INFO_DIR);

(async () => {
  try {
    const mainURL = schoolLists(CITY, TYPE, LEVEL);

    const browser = await pptr.launch({
      executablePath: EXPATH,
      userDataDir: UDDIR,
      // headless: false,
    });

    const page = await browser.newPage();

    await page.goto(mainURL, { timeout: 0 });

    const schools = JSON.parse(await page.$eval("*", (el) => el.innerText));

    const filterization = ({ name }) => {
      const arrayFiltered = name
        .split(/\s/g)
        .filter((constraint) => Number(constraint));

      return Number(arrayFiltered[0]);
    };

    const data = schools.result.itemsList
      .map((school) => ({
        npsn: school.npsn,
        name: school.name,
      }))
      .sort((a, b) => filterization(a) - filterization(b));

    fs.writeFileSync(
      path.join(
        INFO_DIR,
        `schools-${CITY.replace(/\s/g, "_")}-${TYPE}-${LEVEL}.json`
      ),
      JSON.stringify(data, null, 2)
    );

    await browser.close();
  } catch (e) {
    console.error(e);
  }
})();
