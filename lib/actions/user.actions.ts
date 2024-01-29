import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import { handleError } from "../utils"

 type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
  }



export async function createUser(user: CreateUserParams) {
    try {
      await connectToDatabase()
  
      const newUser = await User.create(user)
      return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
      handleError(error)
    }
  }