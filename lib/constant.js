const path = require("path");
require("dotenv").config();

const UDDIR = path.join(__dirname, "..", "PPDB-UserData");
const EXPATH = process.env.EXPATH;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

module.exports = {
  UDDIR,
  EXPATH,
  USERNAME,
  PASSWORD,
};
