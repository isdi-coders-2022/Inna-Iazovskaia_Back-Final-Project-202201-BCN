const { notFoundError } = require("./errors");

describe("Given a notFoundError middleware", () => {
  describe("When it receives a response", () => {
    test("Then it should response with 404 error code and json method with the error 'Resource not found'", () => {
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const error = {
        code: 404,
        message: "Resource not found",
      };
      const expectedError = { error: true, message: error.message };

      notFoundError(null, res);

      expect(res.status).toHaveBeenCalledWith(error.code);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});
