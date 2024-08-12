import { Request, Response } from "express";
import { UserService } from "../services/user-service";
import { HttpException } from "../utils/http-exception";
import { Types } from "mongoose";

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
    const { name, email } = req.body;
    if (!name || !email) {
      res.status(400).json({error: "Name and email are required."});
      return;
    }
    const newUser = await userService.createUser(name, email);
    res.status(201).json(newUser);
  }

  /**
   * Retrieves all users.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  }

  /**
   * Retrieves a user by their ID.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @throws {HttpException} If the user is not found.
   */
  static async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid user ID format.' });
      return;
    }
    const user = await userService.getUserById(id);
    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
      //throw new HttpException(404, "User not found.");
    }
    res.status(200).json(user);
  }
}
