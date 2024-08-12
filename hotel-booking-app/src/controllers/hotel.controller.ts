import { Request, Response } from "express";
import { HotelService } from "../services/hotel.service";
import { CustomError } from "../utils/custom.error";
const hotelService = new HotelService();
/**
 * A controller class for handling hotel related operations
 */
export class HotelController {
  /**
   * Create a new hotel
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @returns {Promise<void>}
   */
  static async createHotel(req: Request, res: Response): Promise<void> {
    const { name, address, established, email, phoneNumber, description } =
      req.body;
    if (
      !name ||
      !address ||
      !established ||
      !email ||
      !phoneNumber ||
      !description
    ) {
      res.status(400).json({ error: "All fields are required." });
      return;
    }
    try {
      const hotel = await hotelService.createHotel(
        name,
        address,
        established,
        email,
        phoneNumber,
        description
      );
      res.status(201).json(hotel);
    } catch (error: any) {
      if (error instanceof CustomError)
        res
          .status(error.statusCode)
          .json({ error: error.error, message: error.message });
    }
  }
}
