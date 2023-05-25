const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const MAINDIR = path.join(__dirname, "..");

const buffer = fs.readFileSync(path.join(MAINDIR, ".env"));
const parsed = dotenv.parse(buffer);

// Main Config
const UDDIR = path.join(MAINDIR, "PPDB-UserData");
const RESULT_DIR = path.join(MAINDIR, "result");
const INFO_DIR = path.join(MAINDIR, "info");
const RES_PDF_DIR = path.join(RESULT_DIR, "pdf");
const RES_JSON_DIR = path.join(RESULT_DIR, "json");
const EXPATH = parsed.EXPATH;

// Akun untuk Login
const USERNAME = parsed.USERNAME;
const PASSWORD = parsed.PASSWORD;

// Pengaturan Sekolah
const CITY = parsed.CITY;
const TYPE = parsed.TYPE;
const LEVEL = parsed.LEVEL;

// Pengaturan registrant
const SCH_NPSN = !process.env.SCH_NPSN ? parsed.SCH_NPSN : process.env.SCH_NPSN;
const OPTION_TYPE = parsed.OPTION_TYPE;

module.exports = {
  CITY,
  TYPE,
  LEVEL,
  UDDIR,
  EXPATH,
  SCH_NPSN,
  MAINDIR,
  USERNAME,
  PASSWORD,
  INFO_DIR,
  RESULT_DIR,
  RES_PDF_DIR,
  RES_JSON_DIR,
  OPTION_TYPE,
};
