import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./database";

// Load .env content into process.env

dotenv.config({ path: ".env.local" });

const app = express();
app.use(express.json());

// Connect to Database
connectDB();

// Global error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong";
  res.status(status).json({ message });
});

export default app;