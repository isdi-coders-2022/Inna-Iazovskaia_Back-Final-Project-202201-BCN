const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const { generalError, notFoundError } = require("./middlewares/errors");
const messagesRouter = require("./routers/messagesRouters/messagesRouters");
const usersRouter = require("./routers/usersRouters/usersRouters");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.use("/messages", messagesRouter);
app.use("/users", usersRouter);

app.use(generalError);
app.use(notFoundError);

module.exports = app;
