const express = require("express");
const {
  getAllMessages,
  deleteMessage,
} = require("../controllers/messagesControllers");

const router = express.Router();

router.get("/all", getAllMessages);
router.delete("/delete/:id", deleteMessage);

module.exports = router;
