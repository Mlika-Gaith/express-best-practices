import { Request, Response } from "express";
import { RoomService } from "../services/room.service";

const roomService = new RoomService();
/**
 * Controller class for room related operations
 * @class
 */
export class RoomController{
    /**
     * Creates a new room
     * @param {Request} req - the request object
     * @param {Response} res - the response object
     * @returns {void} 
     */
    static async createRoom(req: Request, res: Response): Promise<void>{
        const {roomType, roomNumber, price, available, hotel} = req.body;
        const room = await roomService.createRoom(roomType, roomNumber, price, available, hotel);
        if ("statusCode" in room && "message" in room) {
            res.status(room.statusCode).json(room.message);
            return;
        }
            
        res.status(201).json(room); 
    }
}