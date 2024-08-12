import mongoose, { Schema } from "mongoose"
import {RoomType as IRoomType} from "../types/roomType.type"
const RoomTypeSchema : Schema<IRoomType> = new Schema({
    name:{
        type: String,
        required:true,
    },
    hotel:{
        type:Schema.Types.ObjectId,
        ref:"Hotel",
        required: true,
    },
    numberOfRooms:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required: false,
    }
})

export const RoomType = mongoose.model<IRoomType>("RoomType", RoomTypeSchema)
