import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./database";
import userRoutes from "./routes/user-routes";
import { HttpException } from "./utils/http-exception";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

// Load .env content into process.env
dotenv.config({ path: ".env.local" });

const app = express();
app.use(express.json());

// Connect to Database
connectDB();

// Load the Swagger documents
const swaggerDocument = YAML.load("./swagger.yaml");

// Serve the Swagger documents
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// routes
app.use("/api", userRoutes);

// Global error handling middleware
app.use(
  (err: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    res.status(status).json({ message });
  }
);

export default app;
