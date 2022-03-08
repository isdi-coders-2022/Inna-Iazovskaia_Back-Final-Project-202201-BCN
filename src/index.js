require("dotenv").config();
const debug = require("debug")("findme:root");
const chalk = require("chalk");
const uppServer = require("./server/uppServer");
const app = require("./server/index");
const connectDatabase = require("./database/index");

const port = process.env.PORT || 4000;
const connectionString = process.env.DATABASE_STRING;

(async () => {
  try {
    await connectDatabase(connectionString);
    await uppServer(port, app);
  } catch (error) {
    debug(chalk.redBright(`Error: ${error.message}`));
  }
})();
