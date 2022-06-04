import { useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import React from 'react'
import Post from '../../components/Post';
import { GET_POST_BY_POST_ID } from '../../graphql/queries';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ADD_COMMENT } from '../../graphql/mutations';
import Avatar from '../../components/Avatar';
import TimeAgo from 'react-timeago';

type FormData = {
  comment: string
}

const PostPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  
  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: { post_id: router.query.postId }
  });
  
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, 'getPostByPostId']
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async data => {
    const notification = toast.loading('Posting comment...');

    await addComment({
      variables: {
        post_id: router.query.postId,
        username: session?.user?.name,
        text: data.comment,
      }
    })

    setValue('comment', '');

    toast.success('Comment posted!', {
      id: notification,
    });
  }

  const post: Post = data?.getPostByPostId;

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} />

      {post && <div className="-mt-1 rounded-b-md border border-t-0 border-neutral-700 bg-neutral-900 p-5 pl-16 mx-4">
        <p className="text-sm text-white pb-1">Comment as <span className="text-red-500">{session?.user?.name}</span></p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <textarea
            {...register('comment')}
            className="h-24 rounded-md text-white bg-neutral-800 border border-neutral-700 p-2 pl-4 outline-none disabled:bg-neutral-600"
            placeholder={session ? 'What are your thoughts?' : 'Please sign in to comment'} disabled={!session}
          />

          <button
            disabled={false}
            type="submit"
            className="bg-red-500 rounded-full p-3 font-semibold text-white disabled:bg-gray-200"
          >Comment</button>
        </form>
      </div>}

      {post && <div className="-my-5 rounded-b-md border border-t-0 border-neutral-700 bg-neutral-900 py-5 px-10 mx-4">
        <hr className="py-2 border-neutral-700" />

        {post?.comments.map((comment, i) => (
          <div
            className="relative flex items-center space-x-2 space-y-5"
            key={comment.id}
          >
            <hr className={`border-neutral-700 absolute top-10 h-16 border left-7 z-0 ${i >= post.comments.length - 1 && "opacity-0"}`} />
            <div className="z-50">
              <Avatar seed={comment.username} />
            </div>

            <div className="flex flex-col">
              <p className="py-2 text-xs text-gray-400">
                <span className="font-semibold text-neutral-500">{comment?.username} · </span>
                <TimeAgo date={comment?.created_at} />
              </p>
              <p className="text-white">{comment?.text}</p>
            </div>
          </div>
        ))}
      </div>}
    </div>
  )
}

export default PostPage