import mongoose, {Schema} from "mongoose"
import {Room as IRoom} from "../types/room.type";
const RoomSchema: Schema<IRoom> = new Schema({
    roomNumber:{
        type: String,
        required: true,
        unique: true,
    },
    price:{
        type: Number,   
        required: true,
    },
    hotel:{
        type: Schema.Types.ObjectId,
        ref: "Hotel",
        required: true,
    },                              
    
})

export const Room = mongoose.model<IRoom>('Room', RoomSchema);                  