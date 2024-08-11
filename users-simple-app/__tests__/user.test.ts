import request from "supertest";
import app from "../src/app";
import User from '../src/models/userModel'; 
describe("User API", () => {
  it("should create a new user", async () => {
    const response = await request(app).post("/api/users").send({
      name: "Test User",
      email: "testuser@example.com",
    });
    // Log the response for debugging
    console.log('Response Status:', response.status);
    console.log('Response Body:', response.body);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", "Test User");
    expect(response.body).toHaveProperty("email", "testuser@example.com");
  });

  it("should get all users", async () => {
    const response = await request(app).get("/api/users");
    console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should get a user by ID", async () =>{
    const testUser = new User({name: 'Test User', email:'testuser@example.com', createdAt: new Date()});
    const savedUser = await testUser.save();
    const response = await request(app).get(`/api/users/${savedUser._id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Test User");
    expect(response.body).toHaveProperty("email", "testuser@example.com");

  })

  it ("should return 404 if user is not found", async()=>{
    const response = await request(app).get('/api/users/66b8c924cbd916d151b18407');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({error: "User not found."});

  })

  it("should return 400 for invalid user ID format", async () =>{
    const response = await request(app).get('/api/users/invalid-id');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid user ID format.' });
    
  })
});
