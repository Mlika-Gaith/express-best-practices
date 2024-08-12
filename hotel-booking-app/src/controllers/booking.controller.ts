import { Request, Response } from "express";
import { BookingService } from "../services/booking.service";
import { CustomError } from "../utils/custom.error";
import { authenticateToken } from "../utils/token.middleware";

const bookingService = new BookingService();

/**
 * A controller class for handling booking related operations
 */
export class BookingController {
    /**
     * Create a new booking
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @returns {Promise<void>}
     */
    static async createBooking(req: Request, res: Response): Promise<void> {
        const { user, roomType, startDate, endDate } = req.body;
        if (!user || !roomType || !startDate || !endDate) {
            res.status(400).json({ error: "All fields are required." });
            return;
        }

        try {
            const booking = await bookingService.createBooking(user, roomType, new Date(startDate), new Date(endDate));
            res.status(201).json(booking);
        } catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.error, message: error.message });
            } else {
                res.status(500).json({ error: "An internal server error occurred." });
            }
        }
    }
}