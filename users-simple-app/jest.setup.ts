import mongoose from 'mongoose';
import { GenericContainer, StartedTestContainer } from 'testcontainers';

jest.setTimeout(60000); // Increase timeout if needed

let mongoContainer: StartedTestContainer;
let mongoUri: string;

beforeAll(async () => {
  // Spin up a MongoDB container
  mongoContainer = await new GenericContainer('mongo')
    .withExposedPorts(27017)
    .start();

  const mongoPort = mongoContainer.getMappedPort(27017);
  mongoUri = `mongodb://localhost:${mongoPort}/test-express-users-app`; // Ensure the database name is consistent

  // Connect to MongoDB using Mongoose
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri, {
      dbName: 'express-users-app' // Ensure the database name is consistent
    });
    console.log("MongoDB connected.");
  }
});

afterAll(async () => {
  if (mongoContainer) {
    await mongoContainer.stop();
    console.log('MongoDB container stopped');
  }
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  }
});