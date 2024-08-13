import request, { Test } from "supertest";
import express, { Application } from "express";
import { UserController } from "../src/controllers/user.controller";
import { UserService } from "../src/services/user.service";
import app from "../src/app";

// Define Mock UserService
jest.mock("../src/services/user.service");
const mockUserService = UserService as jest.Mocked<typeof UserService>;

describe("User API Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("create a new user", () => {
    it("should return 400 if any required fields are missing", async () => {
      const response = await request(app)
        .post("/api/users/register")
        .send({ firstName: "John" });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("All fields are required.");
    });
    it("should return 201 and create the user", async () => {
      const mockAccount = {
        id: "123",
        user: "mockUserId",
        accessToken: "mockToken",
      };
      mockUserService.prototype.createUser.mockResolvedValue(mockAccount);
      const response = await request(app).post("/api/users/register").send({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        username: "johndoe",
        password: "password123",
      });
      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockAccount);
      expect(mockUserService.prototype.createUser).toHaveBeenCalledWith(
        "John",
        "Doe",
        "john.doe@example.com",
        "johndoe",
        "password123"
      );
    });
  });
});
