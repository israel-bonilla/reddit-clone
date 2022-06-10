import { ArrowUpIcon, ArrowDownIcon, ChatAltIcon, GiftIcon, ShareIcon, BookmarkIcon, DotsHorizontalIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import TimeAgo from 'react-timeago'
import Link from 'next/link'
import { Jelly } from '@uiball/loaders'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_VOTE, REMOVE_VOTE } from '../graphql/mutations'
import { GET_VOTES_BY_POST_ID } from '../graphql/queries'

type Props = {
  post: Post
}

const Post = ({ post }: Props) => {
  const { data: session } = useSession();
  const [voteState, setVoteState] = useState<string>("");

  const { data, loading, error } = useQuery(GET_VOTES_BY_POST_ID, {
    variables: { post_id: post?.id }
  });

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_VOTES_BY_POST_ID, 'getVotesByPostId']
  });

  const [deleteVote] = useMutation(REMOVE_VOTE, {
    refetchQueries: [GET_VOTES_BY_POST_ID, 'getVotesByPostId']
  });

  const vote = async (voteType: string) => {
    if(!session) {
      toast("❗ You need to sign in to vote!");
      return;
    }

    const votes: Vote[] = data?.getVotesByPostId;
    const toBeDeleted = votes?.find(vote => vote.username === session?.user?.name)?.id;

    if((voteState === voteType) && (voteState !== "")) {
      if(toBeDeleted) {
        await deleteVote({
          variables: {
            id: toBeDeleted,
          }
        });
      }
    } else {
      if(toBeDeleted) {
        await deleteVote({
          variables: {
            id: toBeDeleted,
          }
        });
      }
      await addVote({
        variables: {
          post_id: post.id,
          username: session?.user?.name,
          vote_type: voteType,
        }
      });
    };
  }

  useEffect(() => {
    const votes: Vote[] = data?.getVotesByPostId;
    const vote = votes?.find(vote => vote.username === session?.user?.name)?.vote_type;
    setVoteState(vote || "");
  }, [data]);

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getVotesByPostId;
    const displayNumber = votes?.reduce((total, vote) => total + (vote.vote_type === "up" ? 1 : -1), 0);

    if(votes?.length === 0) return 0;

    return displayNumber;
  }

  if(!post) {
    return (
      <div className="flex items-center justify-center p-10 w-full">
        <Jelly size={70} color="#FF4501" />
      </div>
    );
  }

  return (
    <div className="cursor-pointer flex rounded-md border border-neutral-700 bg-neutral-900 shadow-sm hover:border hover:border-neutral-400 sm:mx-4">
      <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-[#111] p-4 text-neutral-400">
        <ArrowUpIcon
          onClick={() => vote("up")}
          className={`w-6 h-6 hover:bg-neutral-700 p-1 rounded-md hover:text-red-500 ${voteState === "up" && "text-red-500"}`}
        />
        <p className="text-xs font-bold text-neutral-300">
          {displayVotes(data)}
        </p>
        <ArrowDownIcon
          onClick={() => vote("down")}
          className={`w-6 h-6 hover:bg-neutral-700 p-1 rounded-md hover:text-blue-500 ${voteState === "down" && "text-blue-500"}`}
        />
      </div>
      <Link href={`/post/${post.id}`}>
        <div className="flex flex-col p-3 pb-1">
          <div className="flex space-x-2 items-center">
            <Avatar seed={post.username} />
            <p className="text-sm text-gray-400">
              <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                <span
                  className="font-bold text-neutral-300 hover:text-blue-400 hover:underline cursor-pointer"
                >r/{post.subreddit[0]?.topic}</span>
              </Link>
              <span className="text-gray-500"> · Posted by </span>
              <Link href={`/user/${post.username}`}>
                <span className="text-gray-500 hover:underline">u/{post.username}</span>              
              </Link>
              <span className="text-gray-500"> <TimeAgo date={post.created_at} /></span>
            </p>
          </div>
          
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-neutral-300">{post.title}</h2>
            <p className="mt-2 text-neutral-300">{post.body}</p>
          </div>
          
          <img
              className="w-full mt-4 mb-1"
              src={post.image} alt=""
          />

          <div className="flex space-x-4 text-gray-400">
            <div className="postBtn">
              <ChatAltIcon className="w-6 h-6" />
              <p>{post.comments.length} Comments</p>
            </div>
            <div className="postBtn">
              <GiftIcon className="w-6 h-6" />
              <p className="hidden sm:inline">Award</p>
            </div>
            <div className="postBtn">
              <ShareIcon className="w-6 h-6" />
              <p className="hidden sm:inline">Share</p>
            </div>
            <div className="postBtn">
              <BookmarkIcon className="w-6 h-6" />
              <p className="hidden sm:inline">Save</p>
            </div>
            <div className="postBtn">
              <DotsHorizontalIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Post