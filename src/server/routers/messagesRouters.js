const express = require("express");
const { getAllMessages } = require("../controllers/messagesControllers");

const router = express.Router();

router.get("/all", getAllMessages);

module.exports = router;
