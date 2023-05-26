const pptr = require("puppeteer");
const path = require("path");
const fs = require("fs");
const {
  EXPATH,
  SCH_NPSN,
  OPTION_TYPE,
  RES_PDF_DIR,
  MAINDIR,
} = require("../lib/constant");
const registrantUrl = require("../utils/registrantUrl");
const { schools } = require("../lib");

const html = fs.readFileSync(path.join(MAINDIR, "views", "rgstn.html"), "utf8");

const school = schools.find((school) => school.npsn === SCH_NPSN);

if (!fs.existsSync(RES_PDF_DIR)) fs.mkdirSync(RES_PDF_DIR);

const actualOption = process.env.OPTION_TYPE ?? OPTION_TYPE;

(async () => {
  const browser = await pptr.launch({
    executablePath: EXPATH,
    headless: false,
  });

  try {
    const mainURL = registrantUrl(SCH_NPSN, actualOption);

    console.log("Puppeteer spawned");

    const page = await browser.newPage();

    await page.goto(mainURL, { timeout: 0 });

    const data = JSON.parse(await page.$eval("*", (el) => el.innerText));
    const waktu = new Date();
    console.log("Data berhasil diambil");

    const sortedRegistrant = ((option, data) => {
      const itemsList = data.result.itemsList;

      if (!itemsList) return [];

      switch (option) {
        case "prestasi-rapor":
          return itemsList.sort((a, b) => b.score - a.score);
        case "ketm":
        case "zonasi":
          return itemsList.sort((a, b) => a.distance1 - b.distance1);
        default:
          return itemsList;
      }
    })(actualOption, data);

    if (sortedRegistrant.length < 1) {
      console.log("BELUM ADA YANG DAFTAR!");

      await browser.close();
      process.exit();
    }

    await page.setContent(html, { waitUntil: "networkidle0" });
    console.log("HTML Berhasil Di set");

    await page.evaluate((sortedData) => {
      const tdInnerText = (txt) => {
        const td = document.createElement("td");
        td.innerText = txt;

        return td;
      };

      const tbody = document.querySelector("tbody");

      sortedData.forEach((item, i) => {
        const tr = document.createElement("tr");
        const th = document.createElement("th");

        const nama = tdInnerText(item.name);
        const score = tdInnerText(item.score);
        const distance1 = tdInnerText(item.distance1);
        const distance2 = tdInnerText(
          item.distance2 === 0 ? "-" : item.distance2
        );

        th.setAttribute("scope", "row");
        th.innerText = ++i;

        tr.appendChild(th);
        tr.appendChild(nama);
        tr.appendChild(score);
        tr.appendChild(distance1);
        tr.appendChild(distance2);

        tbody.appendChild(tr);
      });
    }, sortedRegistrant);
    console.log("Looping Data Berhasil");

    const jam = waktu.toLocaleTimeString("id-ID").replace(/\./g, "-");
    const tanggal = waktu.toLocaleDateString("id-ID").replace(/\//g, "-");

    const namaFile = `${school.name}_${OPTION_TYPE}_${SCH_NPSN}_${tanggal}_${jam}.pdf`;

    await page.pdf({
      path: path.join(RES_PDF_DIR, namaFile),
      width: 1366,
      height: 768,
    });
    console.log("PDF GENERATED : ", namaFile);

    await browser.close();
    console.log("Closed");
  } catch (e) {
    console.error(e);

    await browser.close();
  }
})();
