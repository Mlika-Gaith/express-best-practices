module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testTimeout: 60000, // Increase timeout for long-running tests
};
