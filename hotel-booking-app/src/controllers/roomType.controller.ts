import { Request, Response } from "express";
import RoomTypeService from "../services/roomType.service";
import { CustomError } from "../utils/custom.error";

const roomTypeService = new RoomTypeService();
/**
 * A controller class for handling room type related operations
 */
export default class RoomTypeController {
    /**
     * Create a new room type
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @returns {Promise<void>}
     */
  static async createRoomType(req: Request, res: Response): Promise<void> {
    const { name, hotel, numberOfRooms, description } = req.body;
    if (!name || !hotel || !numberOfRooms || !description) {
      res.status(400).json({ error: "All fields are required." });
      return;
    }
    try {
      const roomType = await roomTypeService.createRoomType(
        name,
        hotel,
        numberOfRooms,
        description
      );
      res.status(201).json(roomType);
    } catch (error: any) {
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ error: error.error, message: error.message });
      }
    }
  }
  /**
     * Gets the remaining number of rooms for a given room type
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @returns {Promise<void>}
     */
  static async getRemainingRooms(req: Request, res: Response): Promise<void> {
    const { roomTypeId } = req.params;

    if (!roomTypeId) {
        res.status(400).json({ error: "Room type ID is required." });
        return;
    }

    try {
        const remainingRooms = await roomTypeService.getRemainingRooms(roomTypeId);
        res.status(200).json({ remainingRooms });
    } catch (error: any) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.error, message: error.message });
        }
    }
}
}
