
import RoomForm from '@/components/shared/RoomForm';
import { auth } from '@clerk/nextjs';
import React from 'react'

const Page = async ({params:{id}}:{params:{id:string}}) => {
      const { sessionClaims } = auth();

      const userId = sessionClaims?.userId;
      console.log(userId)
        // const event = await getRoomById(id)
  return (
    <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
    <h3 className="wrapper text-4xl font-bold text-center ">Update listing</h3>
    <div className="wrapper my-8">
        <RoomForm
         userId={"hello"}
          type="Update" 
        />
      </div>
  </section>
  )
}

export default Page

