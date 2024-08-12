import { Address } from "../models/address-model";
import {Address as IAddress} from "../types/address-type";
import {Error as IError} from "../types/error.type";

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
    async createAddress(street: string, city: string, state: string, zip: string, country: string): Promise<IAddress | IError> {
        const existingAddress = await Address.findOne({ street, city, state, zip, country });
        if (existingAddress) {
            return {statusCode: 409, message: 'Address already exists'};
        }
        // Create a new address
        const address = new Address({ street, city, state, zip, country });
        await address.save();
        return address;
    }
}