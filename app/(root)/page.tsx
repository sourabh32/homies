import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
    <div className="wrapper  grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
    <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
            Unlock Shared Living Bliss: Discover Your Ideal Roommate Match Today!</h1>
            <p className="p-regular-20 md:p-regular-24">Transforming House-Hunting into Home-Building: Uncover the Joy of Shared Living with Our Effortless Roommate Matching Platform – Where Comfort Meets Compatibility for a Life You'll Love!</p>
            
            <Button size="lg" asChild  className="button w-full sm:w-fit">
            <Link href="#mates">
            Find mates
            </Link>
            </Button>
           
          </div>
          <Image 
            src="/assets/images/hero.jpg"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
    </div>
    </section>
    </>
  );
}
