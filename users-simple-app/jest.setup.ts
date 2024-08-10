import mongoose from "mongoose";
import { GenericContainer, StartedTestContainer } from "testcontainers";

let mongoContainer: StartedTestContainer;
let mongoUri: string;

beforeAll(async () => {
  // Spin up a MongoDB container
  mongoContainer = await new GenericContainer("mongo")
    .withName("mongo-express-users-app-test")
    .withExposedPorts(27017)
    .start();

  const mongoPort = mongoContainer.getMappedPort(27017);
  mongoUri = `mongodb://localhost:${mongoPort}/`;

  // Connect to MongoDB using Mongoose
  await mongoose.connect(mongoUri, {
    dbName: "test",
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoContainer.stop();
});
