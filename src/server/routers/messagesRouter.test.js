const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const connectDatabase = require("../../database");
const Message = require("../../database/models/Message");
const app = require("../index");

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const connectionString = mongo.getUri();

  await connectDatabase(connectionString);
});

beforeEach(async () => {
  await Message.create({ text: "Hello, mi friend!", id: 1 });
  await Message.create({ text: "How are you?", id: 2 });
});

afterEach(async () => {
  await Message.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

describe("Given a /messages/all/ endpoint", () => {
  describe("When it receives GET request", () => {
    test("Then it should respond with 200 and 2 messages", async () => {
      const { body } = await request(app).get("/messages/all").expect(200);

      expect(body.messages).toHaveLength(2);
      expect(body).toHaveProperty("messages");
    });
  });
});
