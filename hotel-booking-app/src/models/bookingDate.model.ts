import mongoose, { Schema } from "mongoose";
import { Booking as IBooking } from "../types/booking.type";

const BookingSchema: Schema<IBooking> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    roomType: {
        type: Schema.Types.ObjectId,
        ref: "RoomType",
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
})

export const Booking = mongoose.model<IBooking>("Booking", BookingSchema)