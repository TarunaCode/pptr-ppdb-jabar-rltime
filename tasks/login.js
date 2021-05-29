const pptr = require("puppeteer-core");
const { UDDIR, EXPATH, USERNAME, PASSWORD } = require("../lib/constant");

(async () => {
  try {
    const browser = await pptr.launch({
      executablePath: EXPATH,
      userDataDir: UDDIR,
      // headless: false,
    });
    const page = await browser.newPage();

    await page.goto("https://pendaftar.ppdb.disdik.jabarprov.go.id/login", {
      timeout: 0,
    });

    await page.waitForSelector(".login-tabs-container");
    await page.waitForSelector('input[name="username"]');
    await page.waitForSelector('input[name="password"]');
    await page.waitForSelector('button[name="button"]');

    await page.type('input[name="username"]', USERNAME);
    await page.type('input[name="password"]', PASSWORD);

    console.log("Username dan Password telah terisi");

    await Promise.all([
      page.click('button[name="button"]'),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);

    await page.waitForSelector("header.vs-navbar");

    console.log("Berhasil Login");

    await browser.close();
  } catch (e) {
    console.error(e);
  }
})();
