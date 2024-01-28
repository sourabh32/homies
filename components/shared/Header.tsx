import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'
import NavItems from './NavItems'
import MobileNav from './MobileNav'


const Header = () => {
  return (
    <header className="w-full border-b">
    <div className="wrapper flex items-center justify-between">
      <Link href="/" className="w-36">
        <Image 
          src="/assets/logos/homies.png" width={70} height={15}
          alt="Homies logo" 
        />
        Homies
      </Link>

      <SignedIn>
        <nav className="md:flex-between hidden w-full max-w-xs">
          <NavItems />
        </nav>
      </SignedIn>

      <div className="flex w-32 justify-end gap-3">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
          <MobileNav />
        </SignedIn>
        <SignedOut>
          <Button asChild className="rounded-full" size="lg">
            <Link href="/sign-in">
              Login
            </Link>
          </Button>
        </SignedOut>
      </div>
    </div>
  </header>
  )
}

export default Header