import mongoose, {Schema} from "mongoose"
import {Hotel as IHotel} from "../types/hotel-type";
 const HotelSchema: Schema<IHotel> = new Schema({
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique:true,
        },
        established: {
            type: String,
            required: true,
        },
        address: {
            type: Schema.Types.ObjectId,
            ref: "Address",
            required: true,
        },
        
 })

 export const Hotel = mongoose.model<IHotel>('Hotel', HotelSchema);