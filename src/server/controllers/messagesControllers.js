const Message = require("../../database/models/Message");

const getAllMessages = async (req, res) => {
  const messages = await Message.find();
  res.json({ messages });
};

module.exports = { getAllMessages };
