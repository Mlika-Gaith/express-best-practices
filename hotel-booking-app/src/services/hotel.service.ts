import { Hotel } from "../models/hotel.model";
import { Hotel as IHotel } from "../types/hotel.type";
import { CustomError } from "../utils/custom.error";
/**
 * Service class for hotel related operations
 */
export class HotelService {
  /**
   *
   * @param {string} name - the name of the hotel
   * @param {string} address - the address of the hotel
   * @param {string} established - the date the hotel was established
   * @param {string} email - the email of the hotel
   * @param {string} phoneNumber - the phone number of the hotel
   * @param {string} description - the description of the hotel
   * @throws {CustomError} If the hotel already exists
   * @returns  {Hotel} the created hotel
   */
  async createHotel(
    name: string,
    address: string,
    established: string,
    email: string,
    phoneNumber: number,
    description: string
  ): Promise<IHotel> {
    // verify if hotel exists
    const existingHotel = await Hotel.findOne({ name });
    if (existingHotel)
      throw new CustomError(409, "Hotel already exists");
    const hotel = new Hotel({
      name,
      address,
      established,
      email,
      phoneNumber,
      description,
    });
    await hotel.save();
    return hotel;
  }
}
