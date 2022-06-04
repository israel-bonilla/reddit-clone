import React from 'react'
import { BellIcon, ChatIcon, GlobeIcon, PlusIcon, SparklesIcon, SpeakerphoneIcon, VideoCameraIcon } from '@heroicons/react/outline';
import BurgerMenuItem from './BurgerMenuItem';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

interface Props {
  toggleBurgerMenu: () => void
}

const BurgerMenu = ({ toggleBurgerMenu }: Props) => {
  const { data: session } = useSession();

  return (
    <div className="flex absolute top-14 right-0 w-screen h-screen z-50 scrollbar-hide overflow-hidden">
      <div
        onClick={toggleBurgerMenu}
        className="bg-black/40 flex-1"
      ></div>
      <menu className="bg-neutral-900 border-neutral-800 w-52 lg:hidden border-t">
        <BurgerMenuItem Icon={SparklesIcon} name="Popular" />
        <BurgerMenuItem Icon={GlobeIcon} name="All" />
        <BurgerMenuItem Icon={VideoCameraIcon} name="Reddit Live" />
        <BurgerMenuItem Icon={ChatIcon} name="Chat" />
        <BurgerMenuItem Icon={BellIcon} name="Notifications" />
        <BurgerMenuItem Icon={PlusIcon} name="Create Post" />
        <BurgerMenuItem Icon={SpeakerphoneIcon} name="Advertise" />

        <div
          onClick={() => session ? signOut() : signIn()}
          className='flex items-center space-x-2 border border-neutral-800 p-2 cursor-pointer pl-4'
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image layout="fill" objectFit='contain' src="https://links.israelb.xyz/reddit-clone/reddit-logo.png" alt="" />
          </div>
          {session && (
            <div>
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
      </menu>
    </div>
  )
}

export default BurgerMenu