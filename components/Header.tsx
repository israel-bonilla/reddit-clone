import Image from 'next/image'
import React from 'react'
import { BellIcon, ChatIcon, GlobeIcon, PlusIcon, SparklesIcon, SpeakerphoneIcon, VideoCameraIcon, XCircleIcon, SearchIcon } from '@heroicons/react/outline';
import { HomeIcon, ChevronDownIcon, MenuIcon } from '@heroicons/react/solid';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

interface Props {
  toggleBurgerMenu: () => void
  showBurgerMenu: boolean
}

const Header = ({ toggleBurgerMenu, showBurgerMenu }: Props) => {
  const { data: session } = useSession();

  return (
    <div className="sticky top-0 z-50 flex bg-neutral-900 px-4 py-2 border-b border-neutral-700 shadow-sm items-center text-neutral-200">
      <div className="relative h-8 w-20 flex-shrink-0 cursor-pointer hidden lg:inline-flex">
        <Link href="/">
          <Image
            src="https://links.israelb.xyz/reddit-clone/reddit-logo-2.png"
            layout="fill"
            objectFit='contain'
          />
        </Link>
      </div>

      <div className="relative h-8 w-8 flex-shrink-0 cursor-pointer lg:hidden">
        <Link href="/">
          <Image
            src="https://links.israelb.xyz/reddit-clone/reddit-logo-3.png"
            layout="fill"
            objectFit='contain'
          />
        </Link>
      </div>

      <div className="flex items-center mx-6 xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="flex-1 ml-2 hidden lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      <form className="flex flex-1 items-center space-x-2 border border-neutral-700 rounded-sm bg-neutral-800 px-3 py-2">
        <SearchIcon className="h-5 w-5 text-neutral-500"/>
        <input className="flex-1 bg-transparent outline-none text-sm placeholder:text-neutral-500" type="text" placeholder="Search Reddit" />
        <button type="submit" hidden />
      </form>

      <div className="text-neutral-300 space-x-2 items-center mx-5 hidden lg:inline-flex">
        <SparklesIcon className='icon' />
        <GlobeIcon className='icon' />
        <VideoCameraIcon className='icon' />
        <hr className="h-10 border border-neutral-700" />
        <ChatIcon className='icon' />
        <BellIcon className='icon' />
        <PlusIcon className='icon' />
        <SpeakerphoneIcon className='icon' />
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        {
          showBurgerMenu ? (
            <XCircleIcon
              className="icon"
              onClick={toggleBurgerMenu}          
            />
          ) : (
            <MenuIcon
              className="icon"
              onClick={toggleBurgerMenu}
            />
          )
        }
      </div>

      {/* Sign in/out btn */}
      <div
        onClick={() => session ? signOut() : signIn()}
        className='hidden lg:flex items-center space-x-2 border border-neutral-700 py-1 px-2 cursor-pointer'
      >
        <div className="relative h-5 w-5 flex-shrink-0">
          <Image layout="fill" objectFit='contain' src="https://links.israelb.xyz/reddit-clone/reddit-logo.png" alt="" />
        </div>
        {session && (
          <div className="text-sm">
            <p className='truncate text-white'>{session.user?.name}</p>
            <p className='text-gray-400'>1 Karma</p>
          </div>
        )}

        {
          session
          ? <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
          : <p className='text-gray-400'>Sign In</p>
        }
      </div>
    </div>
  )
}

export default Header