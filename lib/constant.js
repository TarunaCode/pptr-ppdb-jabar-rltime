const path = require("path");
require("dotenv").config();

// Main Config
const MAINDIR = path.join(__dirname, "..");
const UDDIR = path.join(MAINDIR, "PPDB-UserData");
const RESULT_DIR = path.join(MAINDIR, "result");
const INFO_DIR = path.join(MAINDIR, "info");
const EXPATH = process.env.EXPATH;

// Akun untuk Login
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

// Pengaturan Sekolah
const CITY = process.env.CITY;
const TYPE = process.env.TYPE;
const LEVEL = process.env.LEVEL;

module.exports = {
  CITY,
  TYPE,
  LEVEL,
  UDDIR,
  EXPATH,
  MAINDIR,
  USERNAME,
  PASSWORD,
  INFO_DIR,
  RESULT_DIR,
};
