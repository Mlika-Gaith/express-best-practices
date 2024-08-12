import { Request, Response } from "express";
import { AddressService } from "../services/address.service";

const addressService = new AddressService();
/**
 * Controller class for handling address related requests.
 */
export class AddressController {
  /**
   * Creates a new address
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  static async createAddress(req: Request, res: Response) {
    const { street, city, state, zip, country } = req.body;
    if (!street || !city || !state || !zip || !country) {
      res.status(400).json({ error: "All fields are required." });
      return;
    }
    const address = await addressService.createAddress(
      street,
      city,
      state,
      zip,
      country
    );
    if ("statusCode" in address && "message" in address) {
        res.status(address.statusCode).json({ error: address.message });
        return;
    }
    res.status(201).json(address);
  }
}
