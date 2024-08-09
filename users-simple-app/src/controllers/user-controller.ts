import { Request, Response } from "express";
import { UserService } from "../services/user-service";
import { HttpException } from "../utils/http-exception";

const userService = new UserService();

/**
 * Controller for handling user-related requests.
 */
export class UserController {
  /**
   * Handles the creation of a new user.
   * @param {Request} req - the request object.
   * @param {Response} res - the response object.
   * @throws {HttpException} If name or email is missing from the request body.
   */
  static async createUser(req: Request, res: Response): Promise<void> {
    const { name, email } = req.body;
    if (!name || !email) {
      throw new HttpException(400, "Name and email are required.");
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
    const user = await userService.getUserById(id);
    if (!user) throw new HttpException(404, "User not found.");
    res.status(200).json(user);
  }
}
