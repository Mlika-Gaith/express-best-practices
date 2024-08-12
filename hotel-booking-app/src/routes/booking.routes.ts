import express from "express";
import { BookingController } from "../controllers/booking.controller";
import { authenticateToken } from "../utils/token.middleware"

const router = express.Router();

router.post("/bookings/add", authenticateToken, BookingController.createBooking);

export default router;