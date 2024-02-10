"use server"

import { connectToDatabase } from "../database"
import Room from "../database/models/room.model"
import User from "../database/models/user.model"
import { handleError } from "../utils"


export interface RoomProps {
  location: String

  imageUrl: String,
  moveIn: Date,
  description: String,
  rent: String,
  numBedrooms: String,
  numBathrooms: String,
  petPolicy: Boolean,
  lookingFor: String,
  type: String,
  hasKitchen: Boolean,
  hasParking: Boolean,
  hasFurniture: Boolean
  smoking: Boolean
  alcohol: Boolean


}



type CreateEventParams = {
  userId: string,
  room: RoomProps
}


const populateEvent = (query: any) => {
  return query
    .populate({ path: 'user', model: User, select: '_id firstName lastName photo email' })
  
}



export const createRoom = async ({ userId, room }: CreateEventParams) => {


  try {
    await connectToDatabase()

    const poster = await User.findById(userId)
    if (!poster) throw new Error('Organizer not found')
    console.log("from,", poster)
    const newEvent = await Room.create({ ...room, user: poster._id })
    return JSON.parse(JSON.stringify(newEvent))
  } catch (error) {
    handleError(error)
  }


}


export async function getRoomById(eventId: string) {
  try {
    await connectToDatabase()

    const event = await populateEvent(Room.findById(eventId))

    if (!event) throw new Error('Event not found')

    return JSON.parse(JSON.stringify(event))
  } catch (error) {
    handleError(error)
  }
}