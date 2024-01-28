import Image from "next/image"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex flex-col sm:flex-row gap-5  justify-center items-center min-h-screen w-full  bg-dotted-pattern bg-cover bg-fixed bg-center">
     <Image 
            src="/assets/images/friends.svg"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] hidden sm:block object-contain object-center 2xl:max-h-[50vh]"
          />
        {children}
      </div>
    )
  }
  
  export default Layout