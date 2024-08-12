import { UserService } from "../services/user-service";
import { Request, Response } from 'express';

const userService = new UserService();

/**
 * Controller for handling user-related requests.
 */
export class UserController {
    /**
     * Handles the creation of a new user.
     * @param {Request} req - the request object.
     * @param {Response} res - the response object.
     */
    static async createUser(req: Request, res: Response): Promise<void> {
        const {firstName, lastName, email, username, password}= req.body;
        if (!firstName || !lastName || !email || !username || !password) {
            res.status(400).json({error: "All fields are required."});
            return;
        }
        const account = await userService.createUser(firstName, lastName, email, username, password);
        res.status(201).json(account);
    }
}