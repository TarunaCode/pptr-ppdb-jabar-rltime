const pptr = require("puppeteer-core");
const path = require("path");
const fs = require("fs");
const {
  EXPATH,
  UDDIR,
  SCH_ID,
  OPTION_TYPE,
  RES_PDF_DIR,
  INFO_DIR,
  MAINDIR,
} = require("../lib/constant");
const { requestWrapper } = require("../lib");

const html = fs.readFileSync(path.join(MAINDIR, "views", "rgstn.html"), "utf8");
const schools = fs
  .readdirSync(INFO_DIR)
  .filter((sch) => sch.includes("schools"));

const schoolsData = require(path.join(INFO_DIR, schools[0]));
const school = schoolsData.find((data) => data.id === SCH_ID);

const registrantUrl = (schoolID, option_type) =>
  `https://api.ppdb.disdik.jabarprov.go.id/portal/registrant?pagination=false&orderby=created_at&order=asc&search=&columns[0][key]=name&columns[0][searchable]=true&columns[1][key]=registration_number&columns[1][searchable]=true&filters[0][key]=first_choice_school&filters[0][value]=${schoolID}&filters[1][key]=option_type&filters[1][value]=${option_type}`;

if (!fs.existsSync(RES_PDF_DIR)) fs.mkdirSync(RES_PDF_DIR);

const namaSekolah = school.name.replace(/\s/g, "-");

(async () => {
  try {
    const mainURL = registrantUrl(SCH_ID, OPTION_TYPE);

    const browser = await pptr.launch({
      executablePath: EXPATH,
      userDataDir: UDDIR,
      // headless: false,
    });
    console.log("Puppeteer spawned");

    const page = await browser.newPage();
    const req = requestWrapper(page);

    await page.setContent(html, { waitUntil: "networkidle0" });
    console.log("HTML Berhasil Di set");

    const data = await req(mainURL);
    const waktu = new Date();
    console.log("Data berhasil diambil");

    await page.evaluate((data) => {
      const sortedRegistrant = (data) =>
        data.result.itemsList.sort((a, b) => b.score - a.score);
      const tdInnerText = (txt) => {
        const td = document.createElement("td");
        td.innerText = txt;

        return td;
      };

      const tbody = document.querySelector("tbody");

      const sortedData = sortedRegistrant(data);

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
    }, data);
    console.log("Looping Data Berhasil");

    const jam = waktu.toLocaleTimeString("id-ID").replace(/\./g, "-");
    const tanggal = waktu.toLocaleDateString("id-ID").replace(/\//g, "-");

    const namaFile = `${namaSekolah}_${OPTION_TYPE}_${SCH_ID}_${tanggal}_${jam}.pdf`;

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
  }
})();
