const { notFoundError, generalError } = require("./errors");

describe("Given a notFoundError middleware", () => {
  describe("When it receives a response", () => {
    test("Then it should response with 404 error code and call json method with the error 'Resource not found'", () => {
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

describe("Given a ggeneralError middleware", () => {
  describe("When it receives an error with code 401 and error message 'Bad request' and a response", () => {
    test("Then it should call responde with 401 error code end call json method with the error", () => {
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const error = {
        code: 401,
        message: "Bad request",
      };
      const expectedError = { error: true, message: error.message };

      generalError(error, null, res);

      expect(res.status).toHaveBeenCalledWith(error.code);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a response", () => {
    test("Then it should call the response with status 500 and json methods with  error", () => {
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const inputError = {
        code: null,
        message: "hola",
      };
      const expectedCode = 500;
      const expectedError = { error: true, message: "Internal server error" };

      generalError(inputError, null, res);

      expect(res.status).toHaveBeenCalledWith(expectedCode);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});
