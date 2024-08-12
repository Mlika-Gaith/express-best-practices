import {Document} from "mongoose"
/**
 * Represents and address entity
 * @typeof {object} Address
 * @property {string} street - The street address.
 * @property {string} city - The city.
 * @property {string} state - The state.
 * @property {string} zip - The zip code.
 * @property {string} country - The country.
 */
export interface Address extends Document{
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}