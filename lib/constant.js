const path = require("path");
require("dotenv").config();

const MAINDIR = path.join(__dirname, "..");
const UDDIR = path.join(MAINDIR, "PPDB-UserData");
const RESULT_DIR = path.join(MAINDIR, "result");
const EXPATH = process.env.EXPATH;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

module.exports = {
  UDDIR,
  EXPATH,
  MAINDIR,
  USERNAME,
  PASSWORD,
  RESULT_DIR,
};
