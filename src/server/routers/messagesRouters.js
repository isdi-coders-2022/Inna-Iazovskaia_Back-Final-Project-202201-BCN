const express = require("express");
const { validate } = require("express-validation");
const {
  getAllMessages,
  deleteMessage,
  createMessage,
  updateMessage,
  getMessage,
} = require("../controllers/messagesControllers/messagesControllers");
const messageValidation = require("../controllers/messageValidation");

const router = express.Router();

router.get("/all", getAllMessages);
router.delete("/delete/:id", deleteMessage);
router.post("/create", validate(messageValidation), createMessage);
router.put("/update/:id", updateMessage);
router.get("/:id", getMessage);

module.exports = router;
