import {Document} from "mongoose"
import { User as IUser } from "./user.type";
import { RoomType as IRoomType } from "./roomType.type";
/**
 * Represents the booking entity.
 * @typeof {object} Booking.
 * @property {string} user - The id of the user that the booking belongs to.
 * @property {string} roomType - The id of the roomType the booking belongs to.
 * @property {Date} startDate - The start date of the booking.
 * @property {Date} endDate - The end date of the booking.
 */
export interface Booking extends Document{
    user: IUser["_id"],
    roomType: IRoomType["_id"],
    startDate: Date;
    endDate: Date;
}