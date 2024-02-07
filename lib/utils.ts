import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export const convertFileToUrl = (file: File) => URL.createObjectURL(file)
export const placesToRent = [
  { id: 1123, type: 'Apartment' },
  { id:4556 , type: 'House' },
  { id: 27271, type: 'Flat' },
  { id: 27721, type: 'Garage'},
  { id: 28281, type: 'Studio' },
  { id: 28282, type: 'Condo' },
  { id: 2891, type: 'Townhouse' },
  { id: 27829, type: 'Office Space' },
 
];
export const lookingFor = [
  { id: 1123, type: 'Male' },
  { id:4556 , type: 'Female' },
  { id: 27271, type: 'Any' },
 
 
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export const handleError = (error: unknown) => {
  console.error(error)
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}