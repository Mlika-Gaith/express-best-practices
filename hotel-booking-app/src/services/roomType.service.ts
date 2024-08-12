import { RoomType } from "../models/roomType.model";
import { RoomType as IRoomType } from "../types/roomType.type";
import { CustomError } from "../utils/custom.error";
/**
 * Service class for handling roomType operations.
 */

export default class RoomTypeService {
  /**
   * Creates a new room type
   * @param {string} name - the name of the room type
   * @param {string} hotel - the hotel the room type belongs to
   * @param {number} numberOfRooms - the number of rooms available for this room type
   * @param {string} description - the description of the room type
   * @throws {CustomError} If the room type already exists
   * @returns {RoomType} the created room type
   */
  async createRoomType(
    name: string,
    hotel: string,
    numberOfRooms: number,
    description: string
  ): Promise<IRoomType> {
    const existingRoomType = await RoomType.findOne({ name });
    if (existingRoomType)
      throw new CustomError(409, "Room type already exists for this hotel.");
    const roomType = new RoomType({ name, hotel, numberOfRooms, description });
    await roomType.save();
    return roomType;
  }
  /**
   * Decreases the number of rooms of a certain type
   * @param {string} roomTypeId - the id of the room type
   * @throws {CustomError} If the number of rooms is insufficient
   */
  async decreaseRoomQuantity(roomTypeId: string): Promise<void> {
    const roomType = await RoomType.findById(roomTypeId);
    if (!roomType || roomType.numberOfRooms <= 0)
      throw new CustomError(400, "No rooms available for this type.");
    roomType.numberOfRooms -= 1;
    await roomType.save();
  }
}
