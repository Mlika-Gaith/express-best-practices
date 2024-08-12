import { Router } from "express";
import RoomTypeController from "../controllers/roomType.controller";

const router = Router();
router.post("/roomTypes/add", RoomTypeController.createRoomType)
export default router;
