import { Request, Response } from "express";
import RoomTypeService from "../services/roomType.service";
import { CustomError } from "../utils/custom.error";

const roomTypeService = new RoomTypeService();

export default class RoomTypeController {
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
}
