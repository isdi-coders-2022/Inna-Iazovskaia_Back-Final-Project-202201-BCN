const Message = require("../../database/models/Message");
const { deleteMessage } = require("./messagesControllers");

describe("Given a deleteMessage controller", () => {
  describe("When it receives a response with id of existing message", () => {
    test("Then it should call method json with deleted message", async () => {
      const messageToDelete = {
        id: "35",
      };
      const req = {
        params: {
          id: "35",
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const status = 200;
      const expectedDeletedMessage = { id: messageToDelete.id };

      Message.findByIdAndDelete = jest
        .fn()
        .mockResolvedValue(expectedDeletedMessage);

      await deleteMessage(req, res, null);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith(messageToDelete);
    });
  });

  describe("When it receives a response with id of not existing message", () => {
    test("Then it should call next with error message 'Message not found'", async () => {
      const req = {
        params: {
          id: "35",
        },
      };
      const next = jest.fn();
      const error = new Error("Message not found");

      Message.findByIdAndDelete = jest.fn().mockResolvedValue(undefined);
      await deleteMessage(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a response with id of a message and database not connected", () => {
    test("Then it should call next error message 'Message not deleted'", async () => {
      const req = {
        params: {
          id: "35",
        },
      };
      const next = jest.fn();
      const error = new Error("Message not deleted");

      Message.findByIdAndDelete = jest.fn().mockRejectedValue(error);
      await deleteMessage(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
