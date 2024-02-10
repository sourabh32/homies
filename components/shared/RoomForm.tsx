"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"


import { cn } from "@/lib/utils"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
import { createRoom } from "@/lib/actions/room.actions"
import { useRouter } from "next/navigation"




const formSchema = z.object({
    location: z.string().min(2).max(50),
    description: z.string().min(10).max(400),
    moveIn: z.date(),
    rent: z.string(),
    numBedrooms: z.string(),
    numBathrooms: z.string(),
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




const roominitialValues = {
    location: "",
    description: "",
    moveIn: new Date(),
    rent: "",
    numBedrooms: "",
    numBathrooms: "",
    hasKitchen: false,
    hasFurniture: false,
    petPolicy: false,

    imageUrl: "",
    hasParking: false,
    lookingFor: "Any",
    smoking: false,
    alcohol: false



}


const RoomForm = ({ userId, type, room, roomId }: EventFormProps) => {

    const [files, setFiles] = useState<File[]>([])

  const initialValues =  room && type === 'Update' 
  ? { 
    ...room, 
    moveIn: new Date(room.moveIn)
    
  }
  : roominitialValues;



    const router = useRouter()
    const { startUpload } = useUploadThing("imageUploader");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        let uploadedImageUrl = values.imageUrl
        if (files.length > 0) {
            const uploadedImages = await startUpload(files)
            if (!uploadedImages) {
                return
            }

            uploadedImageUrl = uploadedImages[0].url
        }



        if (type === 'Create') {
            console.log(values)
            try {
                const newEvent = await createRoom({
                    room: { ...values, imageUrl: uploadedImageUrl },
                    userId,

                })

                if (newEvent) {
                    form.reset();
                    router.push(`/place/${newEvent._id}`)
                }
            } catch (error) {
                console.log(error);
            }
        }

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
                                    <Input type="number" placeholder="rent" {...field} />
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
                            <FormItem className="flex flex-col">
                            <FormLabel>MoveIn date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-[240px]  text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date:Date) =>
                                    date <= new Date() || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            
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
                                    <Input type="number" placeholder="bedrooms" {...field} />
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
                                    <Input type="number" placeholder="bathrooms" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <div className="flex items-start  flex-col sm:flex-row gap-5 space-x-2">
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

                <div className="flex  flex-col gap-5 sm:flex-row items-start   space-x-2">
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




                <Button 
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? (
            'Submitting...'
          ): `${type} Event `}</Button>

            </form>
        </Form>
    )
}

export default RoomForm






