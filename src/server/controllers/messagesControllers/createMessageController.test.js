const Message = require("../../../database/models/Message");
const { createMessage } = require("./messagesControllers");

describe("Given a createMessage controller", () => {
  describe("When it receives a request with message 'Hello!!!'", () => {
    test("Then it should call method json with received message", async () => {
      const newMessage = {
        text: "Hello!!!",
      };
      const req = {
        body: newMessage,
      };
      const res = {
        json: jest.fn(),
      };

      Message.create = jest.fn().mockResolvedValue(req.body);

      await createMessage(req, res);

      expect(res.json).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(newMessage);
    });
  });

  describe("When it receives request with invalid data format", () => {
    test("Then it should call next with error 'Invalid data format'", async () => {
      const newMessage = {
        text: "Hello!!!",
      };
      const req = {
        body: newMessage,
      };
      const next = jest.fn();
      const error = new Error("Invalid data format");

      Message.create = jest.fn().mockResolvedValue(undefined);

      await createMessage(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives request with invalid format of data", () => {
    test("Then it should call next with error 'Invalid data format'", async () => {
      const newMessage = {
        text: "Hello!!!",
      };
      const req = {
        body: newMessage,
      };
      const next = jest.fn();
      const error = new Error("Couldn't create message");

      Message.create = jest.fn().mockRejectedValue(error);

      await createMessage(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a request and database isn't connected", () => {
    test("Then it should call the response next method with an error", async () => {
      const newMessage = {
        text: "Hello!!!",
      };
      const req = {
        body: newMessage,
      };
      const next = jest.fn();

      Message.create = jest.fn().mockResolvedValue(null);

      await createMessage(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
