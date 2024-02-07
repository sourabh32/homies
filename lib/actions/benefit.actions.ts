"use server"

import { connectToDatabase } from "../database";
import Benefit from "../database/models/benefit.model"

import { handleError } from "../utils"




export const createBenefit = async (title:String) =>{

    try {
          await connectToDatabase();
        const newPrefernce = await  Benefit.create({title})
        return JSON.parse(JSON.stringify(newPrefernce))
    } catch (error) {
       handleError(error)
    }

}


export const getAllBenefit = async () => {
    try {
      await connectToDatabase();
  
      const allBenefits = await Benefit.find();
      console.log(allBenefits)
  
      return JSON.parse(JSON.stringify(allBenefits));
    } catch (error) {
      console.log(error)
      handleError(error)
    }
  }