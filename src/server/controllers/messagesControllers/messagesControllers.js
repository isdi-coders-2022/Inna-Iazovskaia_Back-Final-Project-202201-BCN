const Message = require("../../../database/models/Message");

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

const createMessage = async (req, res, next) => {
  try {
    const createdMessage = await Message.create(req.body);
    if (createdMessage) {
      res.json(createdMessage);
    } else {
      const error = new Error("Invalid data format");
      error.code = 400;
      next(error);
    }
  } catch (error) {
    error.code = 500;
    error.message = "Couldn't create message";
    next(error);
  }
};

const updateMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const messageToUpdate = req.body;
    const updatedMessage = await Message.findByIdAndUpdate(id, messageToUpdate);
    if (messageToUpdate) {
      res.status(201).json(updatedMessage);
    } else {
      const error = new Error("Message not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 500;
    error.message = "Couldn't update message";
    next(error);
  }
};

const getMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);
    if (message) {
      res.json(message);
    } else {
      const error = new Error("Message not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMessages,
  deleteMessage,
  createMessage,
  updateMessage,
  getMessage,
};
