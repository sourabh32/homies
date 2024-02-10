import RoomForm from '@/components/shared/RoomForm';
import { getRoomById } from '@/lib/actions/room.actions';
import { auth } from '@clerk/nextjs';
import React from 'react'

const Page = async ({params:{id}}:{params:{id:string}}) => {
      const { sessionClaims } = auth();
      const userId = sessionClaims?.userId as string;
    const room = await getRoomById(id)
    console.log(room)

  return (
    <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
    <h3 className="wrapper text-4xl font-bold text-center ">Update listing</h3>
    <div className="wrapper my-8">
        <RoomForm
          type="Update" 
         userId={userId}
          room={room}
          roomId={room._id}
        />
      </div>
  </section>
  )
}

export default Page























// import EventForm from "@/components/shared/EventForm"
// import { getEventById } from "@/lib/actions/event.actions"
// import { auth } from "@clerk/nextjs";

// type UpdateEventProps = {
//   params: {
//     id: string
//   }
// }

// const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
//   const { sessionClaims } = auth();

//   const userId = sessionClaims?.userId as string;
//   const event = await getEventById(id)

//   return (
//     <>
//       <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
//         <h3 className="wrapper h3-bold text-center sm:text-left">Update Event</h3>
//       </section>

//       <div className="wrapper my-8">
//         <EventForm 
//           type="Update" 
//           event={event} 
//           eventId={event._id} 
//           userId={userId} 
//         />
//       </div>
//     </>
//   )
// }

// export default UpdateEvent