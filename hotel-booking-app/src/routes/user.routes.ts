import {Router} from "express";
import {UserController} from "../controllers/user.controller";

const router = Router();

router.post("/users/register", UserController.createUser);
router.post("/users/login", UserController.authenticateUser);
router.post("/users/logout", UserController.logoutUser);

export default router;