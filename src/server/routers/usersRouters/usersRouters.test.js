require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcrypt");
const connectDatabase = require("../../../database");
const User = require("../../../database/models/User");
const app = require("../../index");

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const connectionString = mongo.getUri();

  await connectDatabase(connectionString);
});

beforeEach(async () => {
  const cryptPassword = await bcrypt.hash("userpassword", 10);
  await User.create({
    name: "Tomas",
    username: "superTomas",
    password: cryptPassword,
  });
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

describe("Given a /users/login/ endpoint", () => {
  describe("When it receives a POST request with valid username and password", () => {
    test("Then it should respond with 200 status code and token", async () => {
      const user = {
        name: "Tomas",
        username: "superTomas",
        password: "userpassword",
      };
      const { body } = await request(app)
        .post("/users/login")
        .send(user)
        .expect(200);

      expect(body).toHaveProperty("token");
    });
  });

  describe("When it receives a POST request with valid username", () => {
    test("Then it should respond with 401 status code error message 'User not found'", async () => {
      const user = {
        name: "Testman",
        username: "Testman",
        password: "testpassa",
      };
      const expectedErrorMessage = "User not found";

      const { body } = await request(app)
        .post("/users/login")
        .send(user)
        .expect(401);

      expect(body).toHaveProperty("error");
      expect(body.message).toBe(expectedErrorMessage);
    });
  });

  describe("When it receives a POST request with valid username 'superTomas' and invalid password", () => {
    test("Then it should respond with 401 code and error message 'Invalid password for user superTomas'", async () => {
      const user = {
        name: "Tomas",
        username: "superTomas",
        password: "lsadfklkdf",
      };
      const expectedErrorMessage = "Invalid password for user superTomas";

      const { body } = await request(app)
        .post("/users/login")
        .send(user)
        .expect(401);

      expect(body).toHaveProperty("error");
      expect(body.message).toBe(expectedErrorMessage);
    });
  });
});
