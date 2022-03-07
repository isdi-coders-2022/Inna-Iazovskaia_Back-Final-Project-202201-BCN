require("dotenv").config();
const express = require("express");
const debug = require("debug")("findme:root");
const chalk = require("chalk");
const uppServer = require("./server/uppServer");

const app = express();
const port = process.env.PORT || 4000;

(async () => {
  try {
    await uppServer(port, app);
  } catch (error) {
    debug(chalk.redBright(`Error: ${error.message}`));
  }
})();
