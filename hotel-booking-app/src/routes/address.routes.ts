import {Router} from "express";
import {AddressController} from "../controllers/address.controller";

const router = Router();

router.post("/address/add", AddressController.createAddress);

export default router;