import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'

interface Props {
  seed?: string
  large?: boolean

}

const Avatar = ({ seed, large }: Props) => {
  const { data: session } = useSession();

  return (
    <div className={`relative ${large ? "h-20 w-20" : "h-10 w-10"} rounded-full border-gray-300 bg-white overflow-hidden`} >
      <Image
        src={`https://avatars.dicebear.com/api/identicon/${seed || session?.user?.name || 'default seed'}.svg`}
        layout="fill"
        objectFit='contain'
      />
    </div>
  )
}

export default Avatar