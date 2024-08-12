import { Room } from "../models/room.model";
import { Room as IRoom } from "../types/room.type";
import { CustomError } from "../utils/custom.error";
/**
 * Service class for room related operations
 */
export class RoomService {
  /**
   * Creates a new room
   * @param {string} roomType - the type of the room
   * @param {string} roomNumber - the number of the room
   * @param {number} price - the price of the room
   * @param {boolean} available - the availability of the room
   * @param {string} hotel - the hotel the room belongs to
   * @throws {CustomError} If the room already exists
   * @returns  {Room} the created room
   */
  async createRoom(
    roomNumber: string,
    price: number,
    available: boolean,
    hotel: string
  ): Promise<IRoom> {
    // verify if room exists
    const existingRoom = await Room.findOne({ roomNumber });
    if (existingRoom) {
      throw new CustomError(409, "Room already exists.");
    }
    const room = new Room({ roomNumber, price, available, hotel });
    await room.save();
    return room;
  }
}
