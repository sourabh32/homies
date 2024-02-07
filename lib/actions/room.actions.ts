"use server"

import { connectToDatabase } from "../database"
import Room from "../database/models/room.model"
import { handleError } from "../utils"


export interface RoomProps  {
    location:String
    userId:String,
    imageUrl:String,
    moveIn:Date,
    description:String,
    rent:Number,
    numBedrooms:Number,
    numBathrooms:Number,
    petPolicy:Boolean,
    lookingFor:"Male" | "Female" | "Any",
    type:String,
    hasKitchen:Boolean,
    hasParking:Boolean,
    hasFurniture:Boolean
    smoking:Boolean
    alcohol:Boolean
   

}



export const createRoom = async (room:RoomProps) =>{

    try {
          await connectToDatabase();
        const newRoom = await  Room.create({
            ...room
    
        })
        return JSON.parse(JSON.stringify(newRoom))
    } catch (error) {
       handleError(error)
    }

}