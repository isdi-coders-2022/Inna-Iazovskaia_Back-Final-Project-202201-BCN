const express = require("express");
const {
  getAllMessages,
  deleteMessage,
  createMessage,
} = require("../controllers/messagesControllers");

const router = express.Router();

router.get("/all", getAllMessages);
router.delete("/delete/:id", deleteMessage);
router.post("/create", createMessage);

module.exports = router;
