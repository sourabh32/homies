"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { TypeDropdown } from "./Dropdown"
import { Textarea } from "../ui/textarea"
import { Checkbox } from "../ui/checkbox"

import { CalendarCheck } from "lucide-react";

import { useState } from "react"
import { IRoom } from "@/lib/database/models/room.model"
import { useUploadThing } from "@/utils/uploadthing"
import { MultiUploader } from "./UploadImage"
import { autocompleteAddress } from "@/lib/actions/autocomplete.actions"




const formSchema = z.object({
    location: z.string().min(2).max(50),
    description: z.string().min(10).max(400),
    moveIn: z.date(),
    rent: z.number(),
    numBedrooms: z.number(),
    numBathrooms: z.number(),
    petPolicy: z.boolean(),
    type: z.string(),
    
    imageUrl: z.string(),
    hasFurniture: z.boolean(),
    otherCharges: z.boolean(),
    hasKitchen: z.boolean(),
    hasParking: z.boolean(),
    lookingFor: z.string(),
    smoking: z.boolean(),
    alcohol: z.boolean(),


})

type EventFormProps = {
    userId: string
    type: "Create" | "Update"
    room?: IRoom,
    roomId?: string
}







const RoomForm = ({ userId, type, room, roomId }: EventFormProps) => {

    const [files, setFiles] = useState<File[]>([])



    

    const { startUpload } = useUploadThing("imageUploader");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            location: "",
            description: "",
            moveIn: new Date(),
            rent: 100,
            numBedrooms: 2,
            numBathrooms: 2,
            hasKitchen: true,
            hasFurniture: false,
            petPolicy: true,
            
            imageUrl: "",
            hasParking: false,
            lookingFor: "Male",
            smoking: false,
            alcohol: false



        },
    })


    function onSubmit(values: z.infer<typeof formSchema>) {
      
        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex  flex-col gap-5 sm:flex-row">
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>Type</FormLabel>
                                <FormControl>
                                    <TypeDropdown type="type" onChangeHandler={field.onChange} value={field.value} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />


                </div>




                <div className="flex flex-col gap-5 sm:flex-row">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">

                                <FormControl className="h-72">
                                    <Textarea placeholder="Description" className="bg-slate-50" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem className="w-full">

                                <FormControl className="h-72">
                                    <MultiUploader imageUrl={field.value} setFiles={setFiles} onFieldChange={field.onChange} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex  gap-5   flex-col sm:flex-row">
                    <FormField
                        control={form.control}
                        name="rent"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Rent</FormLabel>
                                <FormControl>
                                    <Input className="w-full" placeholder="rent" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Payble rent.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="moveIn"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Bathrooms</FormLabel>
                                <FormControl>

                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                        <CalendarCheck />
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date: Date) => field.onChange(date)}


                                            dateFormat="MM/dd/yyyy"
                                            wrapperClassName="datePicker"
                                        />
                                    </div>

                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />



                </div>

                <FormField control={form.control} name="otherCharges"

                    render={({ field }) => (
                        <FormItem className="w-full">

                            <FormControl>
                                <div className="flex items-center">
                                    <Checkbox onCheckedChange={field.onChange}
                                        checked={field.value} id="otherCharges" />
                                    <label
                                        htmlFor="otherCharges"
                                        className="text-sm font-medium leading-none px-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        water,electricity etc. included
                                    </label>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <p className="text-center text-2xl font-bold text-slate-800">Additional Information</p>

                <div className="flex flex-col gap-5 sm:flex-row">
                    <FormField
                        control={form.control}
                        name="numBedrooms"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Bedrooms</FormLabel>
                                <FormControl>
                                    <Input placeholder="bedrooms" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Number of bedhrooms.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />   <FormField
                        control={form.control}
                        name="numBathrooms"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Bathrooms</FormLabel>
                                <FormControl>
                                    <Input placeholder="bathrooms" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <div className="flex items-start border flex-col sm:flex-row gap-5 space-x-2">
                    <FormField control={form.control} name="hasFurniture"

                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex items-center">
                                        <Checkbox onCheckedChange={field.onChange}
                                            checked={field.value} id="hasFurniture" />
                                        <label
                                            htmlFor="hasFurniture"
                                            className="text-sm font-medium leading-none px-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Furnished
                                        </label>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField control={form.control} name="hasParking"

                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex items-center">
                                        <Checkbox onCheckedChange={field.onChange}
                                            checked={field.value} id="pehasParking" />
                                        <label
                                            htmlFor="pehasParking"
                                            className="text-sm font-medium leading-none px-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Parking
                                        </label>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control} name="hasKitchen"

                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex items-center">
                                        <Checkbox onCheckedChange={field.onChange}
                                            checked={field.value} id="petPolicy" />
                                        <label
                                            htmlFor="petPolicy"
                                            className="text-sm font-medium leading-none px-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Kitchen
                                        </label>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control} name="petPolicy"

                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex items-center">
                                        <Checkbox onCheckedChange={field.onChange}
                                            checked={field.value} id="petPolicy" />
                                        <label
                                            htmlFor="petPolicy"
                                            className="text-sm font-medium leading-none px-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Pet allowed 🐶
                                        </label>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />



                </div>

                <p className="text-center text-2xl font-bold text-slate-800">Room Prefernces</p>

                <div className="flex border flex-col gap-5 sm:flex-row items-start   space-x-2">
                    <FormField control={form.control} name="lookingFor"

                        render={({ field }) => (
                            <FormItem className="w-full">
                                
                                <FormControl>
                                    <TypeDropdown type="lookingFor" onChangeHandler={field.onChange} value={field.value} />
                                </FormControl>
                                <FormDescription>
                                 looking for
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <FormField control={form.control} name="smoking"

                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex items-center">
                                        <Checkbox onCheckedChange={field.onChange}
                                            checked={field.value} id="smoking" />
                                        <label
                                            htmlFor="smoking"
                                            className="text-sm font-medium leading-none px-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Smoking
                                        </label>
                                    </div>
                                </FormControl>
                                <FormDescription>
                                 Is smoking allowed.
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <FormField control={form.control} name="alcohol"

                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex items-center">
                                        <Checkbox onCheckedChange={field.onChange}
                                            checked={field.value} id="smoking" />
                                        <label
                                            htmlFor="smoking"
                                            className="text-sm font-medium leading-none px-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Alcohol
                                        </label>
                                    </div>
                                    
                                </FormControl>
                                <FormDescription>
                                 Is smoking allowed.
                                </FormDescription>
                            </FormItem>
                        )}
                    />

                </div>




                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default RoomForm






