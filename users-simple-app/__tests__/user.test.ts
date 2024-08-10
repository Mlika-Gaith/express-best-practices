import request from "supertest";
import app from "../src/app";

describe("User API", () => {
  it("should create a new user", async () => {
    const response = await request(app).post("/api/users").send({
      name: "Test User",
      email: "testuser@example.com",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", "Test User");
    expect(response.body).toHaveProperty("email", "testuser@example.com");
  });

  it("should get all users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
