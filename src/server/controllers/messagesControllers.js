const Message = require("../../database/models/Message");

const getAllMessages = async (req, res) => {
  const messages = await Message.find();
  res.json({ messages });
};

const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const messageToDalete = await Message.findByIdAndDelete(id);
    if (messageToDalete) {
      res.status(200).json(messageToDalete);
    } else {
      const error = new Error("Message not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.message = "Message not deleted";
    next(error);
  }
};
module.exports = { getAllMessages, deleteMessage };
