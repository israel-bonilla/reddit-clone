import { useRouter } from 'next/router';
import React from 'react'
import Avatar from '../../components/Avatar';
import Feed from '../../components/Feed';

const UserPage = () => {
  const { query: { username } } = useRouter();

  return (
    <div className={`h-24 bg-neutral-500 p-8`}>
      <div className="-mx-8 mt-10 bg-neutral-800">
        <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
          <div className="-mt-5">
            <Avatar seed={username as string} large />
          </div>
          <div className="py-2">
            <h1 className="text-3xl font-semibold text-white">u/{username}</h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl mt-5 pb-10">
        <Feed username={username as string} />
      </div>
    </div>
  )
}

export default UserPage