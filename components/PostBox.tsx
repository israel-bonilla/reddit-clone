import { useMutation } from '@apollo/client';
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import client from '../apollo-client';
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations';
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries';
import Avatar from './Avatar';

type FormData = {
  postTitle: string
  postBody: string
  postImage: string
  subreddit: string
}

type Props = {
  subreddit?: string
}

const PostBox = ({ subreddit } : Props) => {
  const { data: session } = useSession();
  const { register, setValue, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POSTS, 'getPostList']
  });
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);

  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
    const notification = toast.loading('Creating new post...');

    try {
      // query for subreddit topic
      const { data: { getSubredditListByTopic } } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: subreddit || formData.subreddit
        }
      })

      const subredditExists = getSubredditListByTopic.length > 0;

      if(!subredditExists) {
        // create subreddit...
        console.log(`Subreddit not found. Creating new subreddit: ${formData.subreddit} ...`);

        const { data: { insertSubreddit: newSubreddit } } = await addSubreddit({
          variables: {
            topic: formData.subreddit
          }
        })

        console.log("Creating new post...");

        const { data: { insertPost: newPost } } = await addPost({
          variables: {
            subreddit_id: newSubreddit.id,
            username: session?.user?.name,
            title: formData.postTitle,
            body: formData.postBody,
            image: formData.postImage || '',
          }
        })

        console.log("New post added: ", newPost);
      } else {
        // use existing subreddit...

        console.log("Creating new post...");

        const { data: { insertPost: newPost } } = await addPost({
          variables: {
            subreddit_id: getSubredditListByTopic[0].id,
            username: session?.user?.name,
            title: formData.postTitle,
            body: formData.postBody,
            image: formData.postImage || '',
          }
        })

        console.log("New post added: ", newPost);
      }

      // After post has been added
      setValue('postTitle', '');
      setValue('subreddit', '');
      setValue('postBody', '');
      setValue('postImage', '');

      toast.success('Post created!', {
        id: notification,
      });
    } catch (error) {
      toast.error('Whoops something went wrong!', {
        id: notification,
      });
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-16 lg:top-20 z-40 bg-neutral-900 border rounded-md border-neutral-700 p-2 sm:mx-4"
    >
      <div className='flex items-center space-x-3 '>
        <Avatar />

        <input
          {...register('postTitle', { required: true })}
          className="p-2 pl-5 outline-none rounded-md flex-1 border border-neutral-700 bg-neutral-800 text-white text-sm placeholder:text-neutral-500"
          disabled={!session}
          type="text"
          placeholder={session ? subreddit ? `Create a post in r/${subreddit}` : "Create a post by entering a title!" : "Please sign in to post!"}
        />

        <PhotographIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 cursor-pointer ${imageBoxOpen ? "text-blue-400" : "text-neutral-500"}`}
        />
        <LinkIcon className="h-6 cursor-pointer text-neutral-500" />
      </div>

      {!!watch("postTitle") && (
        <div className='flex flex-col py-2'>
          <div className='flex items-center px-2 text-neutral-300'>
            <p className='min-w-[90px]'>Body:</p>
            <input
              className='m-2 flex-1 text-sm text-white bg-neutral-800 rounded-md p-2 outline-none'
              {...register('postBody')}
              type="text"
              placeholder="Text (Optional)"
            />
          </div>

          {!subreddit && (
            <div className='flex items-center px-2 text-neutral-300'>
              <p className='min-w-[90px]'>Subreddit:</p>
              <input
                className='m-2 flex-1 text-sm text-white bg-neutral-800 rounded-md p-2 outline-none'
                {...register('subreddit', { required: true })}
                type="text"
                placeholder="(Required)"
              />
            </div>
          )}

          {imageBoxOpen && (
            <div className='flex items-center px-2 text-neutral-300'>
              <p className='min-w-[90px]'>Image URL:</p>
              <input
                className='m-2 flex-1 text-sm text-white bg-neutral-800 rounded-md p-2 outline-none'
                {...register('postImage')}
                type="text"
                placeholder="(Optional)"
              />
            </div>
          )}

          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className='space-y-2 p-2 text-red-500'>
              {errors.postTitle?.type === 'required' && (
                <p>- A post title is required</p>
              )}

              {errors.subreddit?.type === 'required' && (
                <p>* A subreddit is required</p>
              )}
            </div>
          )}

          <button
            type='submit'
            className='w-full rounded-full bg-blue-400 p-2 text-white font-semibold'
          >Create Post</button>
        </div>
      )}
    </form>
  )
}

export default PostBox