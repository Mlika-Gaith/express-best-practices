import { Document } from 'mongoose';
/**
 * Represents a user entity.
 * @typeof {object} User
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} username - The username of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 * @property {Date} createdAt - The date the user was created.
 * @property {function} comparePassword - A function that compares the user's password with a given password.
 */
export interface User extends Document{
    firstName: string;
    lastName:string;
    username: string;
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<boolean>;
    createdAt: Date;
}