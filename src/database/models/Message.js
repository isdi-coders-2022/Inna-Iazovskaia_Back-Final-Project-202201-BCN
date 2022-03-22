const { model, Schema } = require("mongoose");

const MessageSchema = new Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
  },
  recipient: {
    type: String,
  },
});

const Message = model("Message", MessageSchema, "messages");

module.exports = Message;
