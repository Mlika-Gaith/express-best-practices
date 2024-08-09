import userModel from "../models/userModel";
import { User } from "../types/user-type";

/**
 * Service for managing users.
 */
export class UserService {
  /**
   * Creates a new user.
   * @param {string} name - The name of the user.
   * @param {string} email - The email of the user.
   * @returns {Promise<User>} the created user.
   */
  async createUser(name: string, email: string): Promise<User> {
    const newUser = new userModel({ name, email });
    return newUser.save();
  }

  /**
   * Retrieves all users.
   * @returns {Promise<User[]>} the list of all users.
   */
  async getAllUsers(): Promise<User[]> {
    return userModel.find();
  }

  /**
   * Retrieves a user by their ID.
   * @param {string} id - The ID of the user.
   * @returns {Promise<User | null>} the user if found, otherwise null.
   */
  async getUserById(id: string): Promise<User | null> {
    return userModel.findById(id);
  }
}
