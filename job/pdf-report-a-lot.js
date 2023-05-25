const util = require("util");
const { execFile } = require("child_process");
const { MAINDIR } = require("../lib/constant");
const config = require("../pdf.config");
const { schools } = require("../lib");

const genPdfAsync = (SCH_NPSN) =>
  new Promise((resolve) => {
    const pdfReporting = execFile("node", ["tasks/pdfReportRegistrant"], {
      cwd: MAINDIR,
      env: {
        ...process.env,
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
    const { id, name } = find(sch);
    console.log(`Mengambil data sekolah, ${name}`);

    await genPdfAsync(id);

    console.log("Selesai");
  }
})();
