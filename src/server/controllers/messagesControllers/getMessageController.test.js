const Message = require("../../../database/models/Message");
const { getMessage } = require("./messagesControllers");

describe("Given a getMessage controller", () => {
  describe("When it receives a response with id of existing message", () => {
    test("Then it should call method json with the message in the response", async () => {
      const message = {
        id: "35",
        text: "sorry",
      };
      const req = {
        params: {
          id: "35",
        },
      };
      const res = {
        json: jest.fn(),
      };

      Message.findById = jest.fn().mockResolvedValue(message);

      await getMessage(req, res, null);

      expect(res.json).toHaveBeenCalledWith({ message });
    });
  });

  describe("When it receives with not existing message id", () => {
    test("Then it should call next with error message 'Message not found'", async () => {
      const req = {
        params: {
          id: "35",
        },
      };
      const next = jest.fn();
      const error = new Error("Message not found");

      Message.findById = jest.fn().mockResolvedValue(undefined);
      await getMessage(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a response with id of a message and database not connected", () => {
    test("Then it should call next with an error", async () => {
      const req = {
        params: {
          id: "35",
        },
      };
      const next = jest.fn();
      const error = new Error("Error");

      Message.findById = jest.fn().mockRejectedValue(error);
      await getMessage(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
