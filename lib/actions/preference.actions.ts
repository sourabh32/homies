"use server"

import { connectToDatabase } from "../database";
import Preference from "../database/models/preference.model"
import { handleError } from "../utils"




export const createPreference = async (title:String) =>{

    try {
          await connectToDatabase();
        const newPrefernce = await  Preference.create({title})
        return JSON.parse(JSON.stringify(newPrefernce))
    } catch (error) {
       handleError(error)
    }

}


export const getAllPreference = async () => {
    try {
      await connectToDatabase();
  
      const allPreferences = await Preference.find();
  
      return JSON.parse(JSON.stringify(allPreferences));
    } catch (error) {
      handleError(error)
    }
  }