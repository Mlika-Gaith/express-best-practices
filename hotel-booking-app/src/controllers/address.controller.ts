import { Request, Response } from "express";
import { AddressService } from "../services/address.service";
import { CustomError } from "../utils/custom.error";

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
    try{
      const address = await addressService.createAddress(
        street,
        city,
        state,
        zip,
        country
      );
      res.status(201).json(address);
    }catch(error: any){
      if (error instanceof CustomError)
        res.status(error.statusCode).json({error: error.error, message: error.message})
    }
  }
}
