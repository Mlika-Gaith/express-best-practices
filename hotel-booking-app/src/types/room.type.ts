import { Document } from "mongoose";
import { Hotel as IHotel } from "./hotel.type";
/**
 * Represents a room entity
 * typeof {object} room
 * @property {string} roomType - The room's type.
 * @property {number} price - The room's price.
 * @property {boolean} available - The room's availability.
 * @property {string} hotel - The hotel's id.
 */
export interface Room extends Document{
    roomNumber: string;
    price: number;
    available: boolean;
    hotel: IHotel['_id']; 
}