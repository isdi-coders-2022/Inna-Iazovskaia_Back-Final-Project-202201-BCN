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
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Message = model("Message", MessageSchema, "messages");

module.exports = Message;
