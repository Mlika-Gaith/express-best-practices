import mongoose, {Schema} from "mongoose";
import { Address as IAddress } from "../types/address.type";
const AddressSchema = new Schema<IAddress>({
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
})

export const Address = mongoose.model("Address", AddressSchema);