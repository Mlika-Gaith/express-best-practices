/**
 * Represents a user.
 * @typeof {Object} User
 * @property {string} id - The unique ID of the user.
 * @property {string} name - The name of the user.
 * @property {string} email - The email of the user.
 * @property {Date} createdAt - The date the user was created.
 */
export interface User extends Document {
  name: string;
  email: string;
  createdAt: Date;
}
