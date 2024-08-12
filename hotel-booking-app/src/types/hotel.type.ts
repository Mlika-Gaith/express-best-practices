import { Document } from "mongoose";
import {Address as IAdress} from "./address.type";
/**
 * Represents a hotel entity.
 * @typeof {object} Hotel
 * @property {string} name - The hotel's name.
 * @property {string} description - The hotel's description.
 * @property {string} email - The hotel's email.
 * @property {string} phoneNumber - The hotel's phone number.
 */
export interface Hotel extends Document{
    name: string;
    description: string;
    email: string;
    phoneNumber: string;
    established: string;
    address: IAdress['_id']
}