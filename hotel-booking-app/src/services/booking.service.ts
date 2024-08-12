import { Booking } from "../models/bookingDate.model";
import RoomTypeService from "./roomType.service";

export class BookingService{
    private roomTypeService: RoomTypeService;
    constructor(){
        this.roomTypeService = new RoomTypeService();
    }
   /**
     * Creates a booking for a room
     * @param {string} user- The ID of the user making the booking
     * @param {string} roomType - The ID of the room type being booked
     * @param {Date} startDate - The start date of the booking
     * @param {Date} endDate - The end date of the booking
     * @throws {CustomError} If there are no rooms available of this type
     * @returns {Booking} the created booking
     */
    async createBooking(user:string, roomType:string, startDate:Date, endDate:Date){
        // Decrease the number of rooms of this type
        await this.roomTypeService.decreaseRoomQuantity(roomType);

        // Create the booking
        const booking = new Booking({
            user, roomType, startDate, endDate
        })
        await booking.save()
        return booking;
    }
}