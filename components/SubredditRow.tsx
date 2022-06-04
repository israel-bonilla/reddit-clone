import { ChevronUpIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'
import Avatar from './Avatar'

interface Props {
  topic: string
  index: number
}

const SubredditRow = ({ topic, index }: Props) => {
  return (
    <div className="flex items-center space-x-2 border-t border-neutral-700 bg-neutral-900 px-4 py-2 last:rounded-b">
      <p className="text-neutral-200">{index + 1}</p>
      <ChevronUpIcon className="w-4 h-4 flex-shrink-0 text-green-400" />
      <Avatar seed={topic} />
      <p className="flex-1 truncate text-neutral-200">r/{topic}</p>
      <Link href={`/subreddit/${topic}`}>
        <div className="cursor-pointer rounded-full bg-blue-500 px-3 text-white">View</div>
      </Link>
    </div>
  )
}

export default SubredditRow