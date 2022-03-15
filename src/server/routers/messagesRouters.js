const express = require("express");
const {
  getAllMessages,
  deleteMessage,
  createMessage,
  updateMessage,
} = require("../controllers/messagesControllers");

const router = express.Router();

router.get("/all", getAllMessages);
router.delete("/delete/:id", deleteMessage);
router.post("/create", createMessage);
router.put("/update/:id", updateMessage);

module.exports = router;
