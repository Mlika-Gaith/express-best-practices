import { Router } from "express";
import RoomTypeController from "../controllers/roomType.controller";

const router = Router();
router.post("/roomTypes/add", RoomTypeController.createRoomType)
/**
 * Get the remaining number of rooms for a specific room type
 * @route GET /api/roomTypes/:roomTypeId/remaining-rooms
 * @param {string} roomTypeId - The ID of the room type
 * @returns {object} The remaining number of rooms
 * @throws {CustomError} If the room type is not found or an error occurs
 */
router.get("/roomTypes/:roomTypeId/remaining-rooms", RoomTypeController.getRemainingRooms);
export default router;
