const User = require("../../database/models/User");
const getAllUsers = require("./usersControllers");

describe("Given a getAllUsers controller", () => {
  describe("When it receives a response", () => {
    test("Then it shold call method json with array of users of the received response", async () => {
      const res = {
        json: jest.fn(),
      };
      const users = [
        {
          username: "Anna",
        },
        {
          username: "Emma",
        },
      ];
      User.find = jest.fn().mockResolvedValue(users);

      await getAllUsers(null, res);

      expect(res.json).toHaveBeenCalledWith({ users });
    });
  });
});
