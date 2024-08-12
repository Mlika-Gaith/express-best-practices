import { Router } from "express";
import { RoomController } from "../controllers/room.controller";
const router = Router();

router.post("/rooms/add", RoomController.createRoom);

export default router;