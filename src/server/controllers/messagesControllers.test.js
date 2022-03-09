const Message = require("../../database/models/Message");
const { getAllMessages } = require("./messagesControllers");

describe("Given a getAllMessages controller", () => {
  describe("When it receives a response", () => {
    test("Then it shold call method json with array of messages of the received response", async () => {
      const res = {
        json: jest.fn(),
      };
      const messages = [
        {
          text: "hello",
        },
        {
          text: "i miss you",
        },
      ];
      Message.find = jest.fn().mockResolvedValue(messages);

      await getAllMessages(null, res);

      expect(res.json).toHaveBeenCalledWith({ messages });
    });
  });
});
