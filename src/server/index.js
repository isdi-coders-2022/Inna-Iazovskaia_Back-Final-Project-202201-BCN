const express = require("express");
const morgan = require("morgan");

const cors = this.require("cors");
const helmet = require("helmet");
const { generalError, notFoundError } = require("./middlewares/errors");
const messagesRouter = require("./routers/messagesRouters");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json);
app.use(helmet());

app.use("/messages", messagesRouter);

app.use(generalError);
app.use(notFoundError);

module.exports = app;
