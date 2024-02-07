import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { lookingFor, placesToRent } from "@/lib/utils"








type TypeDropdownProps = {
  onChangeHandler:(...event: any[]) => void,
  value:string,
  type:'type' | 'lookingFor'
}





export const TypeDropdown = ({onChangeHandler,value,type}:TypeDropdownProps) =>{

  if(type ==='lookingFor'){
    return(
      <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Place type" />
      </SelectTrigger>
      <SelectContent className=" outline-none">
       {lookingFor.map((place)=> <SelectItem key={place.id} value={place.type} className="select-item p-regular-14">{place.type}</SelectItem>)}
      </SelectContent>
    </Select>
    )
  }

  return(
    <Select onValueChange={onChangeHandler} defaultValue={value}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Place type" />
  </SelectTrigger>
  <SelectContent className=" outline-none">
   {placesToRent.map((place)=> <SelectItem key={place.id} value={place.type} className="select-item p-regular-14">{place.type}</SelectItem>)}
  </SelectContent>
</Select>
  )

}




