import {Document} from "mongoose";
import {Hotel as IHotel} from "./hotel.type"
/**
 * Represents a roomType entity.
 * @typeof {object} RoomType.
 * @property {string} name - The roomType name.
 * @property {string} hotel - The hotel ID that the roomType belongs to.
 * @property {number} numberOfRooms - The numberOfRooms available in a roomType.
 * @property {string}  description - The description of the roomType.
 */
export interface RoomType extends Document {
    name: string;
    hotel: IHotel['_id']
    numberOfRooms: number;
    description?: string;
}