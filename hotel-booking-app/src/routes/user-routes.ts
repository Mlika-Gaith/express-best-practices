import {Router} from "express";
import {UserController} from "../controllers/user-controller";

const router = Router();

router.post("/users/register", UserController.createUser);

export default router;