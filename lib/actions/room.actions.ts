"use server"

import { connectToDatabase } from "../database"
import Room from "../database/models/room.model"
import { handleError } from "../utils"


export interface RoomProps  {

    userId:String,
    imageUrl:String,
    moveIn:Date,
    description:String,
    rent:Number,
    numBedrooms:Number,
    numBathrooms:Number,
    petPolicy:Boolean,
    lookingFor:"Male" | "Female" | "Any",
    benefits:String[],
    type:String,
   

}

export const createRoom = async (room:RoomProps) =>{
 const {type,
    description,
    lookingFor,
    numBathrooms,
    numBedrooms,
    petPolicy,
    rent,
    moveIn,
    imageUrl,
    userId,
    benefits

} = room
    try {
          await connectToDatabase();
        const newRoom = await  Room.create({type,
            description,
            lookingFor,
            numBathrooms,
            numBedrooms,
            petPolicy,
            rent,
            moveIn,
            imageUrl,
            user:userId,
            benefits
        
        })
        return JSON.parse(JSON.stringify(newRoom))
    } catch (error) {
       handleError(error)
    }

}