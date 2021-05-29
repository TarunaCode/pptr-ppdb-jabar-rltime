const fs = require("fs");
const path = require("path");
const pptr = require("puppeteer-core");
const { UDDIR, EXPATH } = require("../lib/constant");
const { requestWrapper, fetchNwrite } = require("../lib");

let runned = false;

(async () => {
  try {
    const browser = await pptr.launch({
      executablePath: EXPATH,
      userDataDir: UDDIR,
      // headless: false,
    });

    const page = await browser.newPage();
    const req = requestWrapper(page);

    await page.setRequestInterception(true);

    page.on("request", async (request) => {
      request.continue();
      if (request.url().includes("api.ppdb.disdik.jabarprov.go.id")) {
        if (request.method() === "GET") {
          if (!runned) {
            runned = true;
            await fetchNwrite(
              req,
              request.url(),
              request.headers(),
              "bio.json"
            );
          }
        }
      }
    });

    await page.goto("https://pendaftar.ppdb.disdik.jabarprov.go.id/biodata", {
      timeout: 0,
    });

    await page.waitForSelector("label.vs-input--label");
  } catch (e) {
    console.error(e);
  }
})();
