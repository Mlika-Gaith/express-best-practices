import { Hotel } from "../models/hotel-model";
import {Hotel as IHotel} from "../types/hotel-type";
import { Error as IError} from "../types/error.type";
/**
 * Service class for hotel related operations
 */
export class HotelService{
    /**
     * 
     * @param {string} name - the name of the hotel 
     * @param {string} address - the address of the hotel
     * @param {string} established - the date the hotel was established
     * @param {string} email - the email of the hotel 
     * @param {string} phoneNumber - the phone number of the hotel 
     * @param {string} description - the description of the hotel
     * @returns  {Hotel | Error} the created hotel or an error message
     */
    async createHotel(name: string, address: string, established: string, email: string, phoneNumber: number, description: string): Promise<IHotel | IError>{
        // verify if hotel exists
        const existingHotel = await Hotel.findOne({name});
            if (existingHotel)
                return {statusCode: 409, message: 'Hotel already exists'};
        const hotel = new Hotel({name, address, established, email, phoneNumber, description});
        await hotel.save()
        return hotel;
    
    }
}