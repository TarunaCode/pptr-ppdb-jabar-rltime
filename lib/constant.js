const path = require("path");
require("dotenv").config();

// Main Config
const MAINDIR = path.join(__dirname, "..");
const UDDIR = path.join(MAINDIR, "PPDB-UserData");
const RESULT_DIR = path.join(MAINDIR, "result");
const INFO_DIR = path.join(MAINDIR, "info");
const RES_PDF_DIR = path.join(RESULT_DIR, "pdf");
const EXPATH = process.env.EXPATH;

// Akun untuk Login
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

// Pengaturan Sekolah
const CITY = process.env.CITY;
const TYPE = process.env.TYPE;
const LEVEL = process.env.LEVEL;

// Pengaturan registrant
const SCH_ID = process.env.SCH_ID;
const OPTION_TYPE = process.env.OPTION_TYPE;

module.exports = {
  CITY,
  TYPE,
  LEVEL,
  UDDIR,
  EXPATH,
  SCH_ID,
  MAINDIR,
  USERNAME,
  PASSWORD,
  INFO_DIR,
  RESULT_DIR,
  RES_PDF_DIR,
  OPTION_TYPE,
};
