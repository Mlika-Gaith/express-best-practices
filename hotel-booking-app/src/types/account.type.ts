import {User as IUser} from './user.type';
import { Document } from 'mongoose';
/**
 * Represents a user's account entity.
 * @typeof {object} Account
 * @property {string} user - The user's id.
 * @property {string} accessToken - The user's access token.
 * @property {Date} createdAt - The date the account was created.
 */
export interface Account extends Document{
    user: IUser['_id'];
    accessToken: string;
    createdAt: Date;
}
