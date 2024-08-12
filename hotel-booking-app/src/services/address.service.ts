import { Address } from "../models/address.model";
import {Address as IAddress} from "../types/address.type";
import { CustomError } from "../utils/custom.error";

/**
 * AddressService class for address related operations.
 */
export class AddressService {
    /**
     * Create a new address.
     * @param {string} street - The street address.
     * @param {string} city - The city.
     * @param {string} state - The state.
     * @param {string} zip - The zip code.
     * @param {string} country - The country.
     * @returns {Promise<Address>} - The created address.
     */
    async createAddress(street: string, city: string, state: string, zip: string, country: string): Promise<IAddress> {
        const existingAddress = await Address.findOne({ street, city, state, zip, country });
        if (existingAddress) 
            throw new CustomError(409, "Address already exists.")
        // Create a new address
        const address = new Address({ street, city, state, zip, country });
        await address.save();
        return address;
    }
}