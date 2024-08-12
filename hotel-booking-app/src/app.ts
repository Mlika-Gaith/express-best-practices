import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./database";
import userRoutes from "./routes/user.routes";
import addressRoutes from "./routes/address.routes";
import hotelRoutes from "./routes/hotel.routes";
import roomTypeRoutes from "./routes/roomType.routes";
import bookingRoutes from "./routes/booking.routes"

// Load .env content into process.env

dotenv.config({ path: ".env.local" });

const app = express();
app.use(express.json());

// Connect to Database
connectDB();

// routes
app.use("/api", userRoutes, addressRoutes, hotelRoutes, roomTypeRoutes, bookingRoutes);

// Global error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong";
  res.status(status).json({ message });
});

export default app;
