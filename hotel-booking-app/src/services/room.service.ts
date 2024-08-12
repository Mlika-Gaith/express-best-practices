import { Room } from '../models/room.model';
import {Room as IRoom} from "../types/room.type";
import { Error as IError} from "../types/error.type";
/**
 * Service class for room related operations
 */
export class RoomService{
    /**
     * Creates a new room
     * @param {string} roomType - the type of the room
     * @param {string} roomNumber - the number of the room
     * @param {number} price - the price of the room
     * @param {boolean} available - the availability of the room
     * @param {string} hotel - the hotel the room belongs to
     * @returns  {Room | Error} the created room or an error message
     */
    async createRoom(roomType: string, roomNumber: string, price: number, available:boolean, hotel: string): Promise<IRoom | IError>{
        // verify if room exists
        const existingRoom = await Room.findOne({roomNumber});
        if (existingRoom)
            return {statusCode: 409, message: 'Room already exists'};
        const room = new Room({roomType, roomNumber, price, available, hotel});
        await room.save()
        return room;
    
    }
}