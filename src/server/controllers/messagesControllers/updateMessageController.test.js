const Message = require("../../../database/models/Message");
const { updateMessage } = require("./messagesControllers");

describe("Given a updateMessage controller", () => {
  describe("When it receives a response with message id 1 ", () => {
    test("Then it should call method json with updating message", async () => {
      const messageToUpdate = {
        id: "1",
        text: "Hello!",
      };
      const req = {
        params: { id: messageToUpdate.id },
        body: messageToUpdate,
      };
      const expectedUpdatedMessage = messageToUpdate;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Message.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValue(expectedUpdatedMessage);

      await updateMessage(req, res, null);

      expect(res.json).toHaveBeenCalledWith(messageToUpdate);
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

      Message.findByIdAndUpdate = jest.fn().mockResolvedValue(undefined);
      await updateMessage(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a response with id of a message and database not connected", () => {
    test("Then it should call next error message 'Message not updated'", async () => {
      const req = {
        params: {
          id: "35",
        },
      };
      const next = jest.fn();
      const error = new Error("Message not updated");

      Message.findByIdAndUpdate = jest.fn().mockRejectedValue(error);
      await updateMessage(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
