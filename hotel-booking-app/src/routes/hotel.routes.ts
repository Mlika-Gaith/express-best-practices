import { Router } from "express";
import { HotelController } from "../controllers/hotel.controller";
const router = Router();

router.post("/hotels/add", HotelController.createHotel);

export default router;