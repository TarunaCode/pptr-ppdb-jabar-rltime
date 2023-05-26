const { execFile } = require("child_process");
const { MAINDIR } = require("../lib/constant");
const config = require("../pdf.config");
const { schools } = require("../lib");

const OPTIONS = [
  "zonasi",
  "prestasi-rapor",
  "kondisi-tertentu",
  "prestasi",
  "ketm",
  "abk",
];

const genPdfAsync = (SCH_NPSN, OPTION_TYPE) =>
  new Promise((resolve) => {
    const pdfReporting = execFile("node", ["tasks/pdfReportRegistrant"], {
      cwd: MAINDIR,
      env: {
        ...process.env,
        OPTION_TYPE,
        SCH_NPSN,
      },
    });

    pdfReporting.stdout.on("data", console.log);
    pdfReporting.stderr.on("data", console.error);

    pdfReporting.on("close", () => resolve());
  });

const find = (name) => schools.find((sch) => sch.name === name);

(async () => {
  for (const sch of config) {
    const { npsn, name } = find(sch);
    console.log(`Mengambil data sekolah, ${name}`);

    for (const option of OPTIONS) await genPdfAsync(npsn, option);

    console.log("Selesai");
  }
})();
