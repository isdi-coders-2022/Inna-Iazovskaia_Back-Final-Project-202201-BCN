const express = require("express");
const getAllMessages = require("../controllers/messagesControllers");

const messagesRouter = express.Router;

messagesRouter.length("/all", getAllMessages);

module.exports = messagesRouter;
