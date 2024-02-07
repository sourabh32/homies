"use server"

import { connectToDatabase } from "../database"
import Room from "../database/models/room.model"
import User from "../database/models/user.model"
import { handleError } from "../utils"


export interface RoomProps  {
    location:String
    
    imageUrl:String,
    moveIn:Date,
    description:String,
    rent:Number,
    numBedrooms:Number,
    numBathrooms:Number,
    petPolicy:Boolean,
    lookingFor:String,
    type:String,
    hasKitchen:Boolean,
    hasParking:Boolean,
    hasFurniture:Boolean
    smoking:Boolean
    alcohol:Boolean
   

}



type CreateEventParams ={
    userId:string,
    room:RoomProps
}


export const createRoom = async ({ userId, room}: CreateEventParams) =>{


    try {
        await connectToDatabase()
    
        const poster = await User.findById(userId)
        if (!poster) throw new Error('Organizer not found')
    
        const newEvent = await Room.create({ ...room,userId:poster._id })
        
    
        return JSON.parse(JSON.stringify(newEvent))
      } catch (error) {
        handleError(error)
      }

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