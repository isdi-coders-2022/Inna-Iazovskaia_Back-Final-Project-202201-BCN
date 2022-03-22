const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const connectDatabase = require("../../../database");
const Message = require("../../../database/models/Message");
const app = require("../../index");

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const connectionString = mongo.getUri();

  await connectDatabase(connectionString);
});

beforeEach(async () => {
  await Message.create({ text: "Hello, mi friend!" });
  await Message.create({ text: "How are you?" });
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
    test("Then it should respond with 200 status code and 2 messages", async () => {
      const { body } = await request(app).get("/messages/all").expect(200);

      expect(body.messages).toHaveLength(2);
      expect(body).toHaveProperty("messages");
    });
  });
});

describe("Given a /messages/delete/:id endpoint", () => {
  describe("When it receives DELETE request with existing message id", () => {
    test("Then it should respond with 200 status code and deleted message", async () => {
      const messageToDalete = await Message.findOne();

      const { body } = await request(app)
        .delete(`/messages/delete/${messageToDalete.id}`)
        .send(messageToDalete)
        .expect(200);

      expect(body.text).toEqual(messageToDalete.text);
    });
  });
});

describe("Given a /messages/create endpoint", () => {
  describe("When it receives POST request with a message", () => {
    test("Then it should respond with 201 status code and the message", async () => {
      const newMessage = {
        text: "I am fine",
      };
      const { body } = await request(app)
        .post("/messages/create")
        .send(newMessage)
        .expect(200);

      expect(body.text).toBe(newMessage.text);
    });
  });

  describe("When it receives POST request with invalid data", () => {
    test("Then it should respond with 500 code", async () => {
      const newMessage = "";
      const expectedErrorMessage = "Internal server error";

      const { body } = await request(app)
        .post("/messages/create")
        .send(newMessage)
        .expect(500);

      expect(body.message).toBe(expectedErrorMessage);
    });
  });
});

describe("Given a /messages/update/:id endpoint", () => {
  describe("When it receives PUT request with existing message id", () => {
    test("Then it should respond with 201 status code and updated message", async () => {
      const messageToUpdate = await Message.findOne();

      const { body } = await request(app)
        .put(`/messages/update/${messageToUpdate.id}`)
        .send(messageToUpdate)
        .expect(200);

      expect(body.text).toEqual(messageToUpdate.text);
    });
  });
});

describe("Given a /messages/:id endpoint", () => {
  describe("When it receives GET request with id of existing message", () => {
    test("Then it should respond with 200 status code and the message", async () => {
      const message = await Message.findOne();

      const { body } = await request(app)
        .get(`/messages/${message.id}`)
        .send(message)
        .expect(200);

      expect(body.text).toEqual(message.text);
    });
  });

  describe("When it receives GET request with id of not existing message", () => {
    test("Then it should respond with 500 status code and error", async () => {
      const message = {
        text: "Hello",
        id: "5",
      };

      const { body } = await request(app)
        .get(`/messages/${message.id}`)
        .send(message)
        .expect(500);

      expect(body).toHaveProperty("error");
    });
  });
});
