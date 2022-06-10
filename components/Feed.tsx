import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ALL_POSTS, GET_POSTS_BY_TOPIC, GET_POSTS_BY_USERNAME } from '../graphql/queries';
import Post from './Post';

type Props = {
  topic?: string
  username?: string
}

const Feed = ({ topic, username }: Props) => {
  const { data, error } = (topic && topic != undefined)
    ? useQuery(GET_POSTS_BY_TOPIC, {
        variables: { topic }
      })
    : (username && username != undefined)
    ? useQuery(GET_POSTS_BY_USERNAME, {
        variables: { username }
      })
    : useQuery(GET_ALL_POSTS);

  const posts: Post[] =
    topic
    ? data?.getPostsByTopic
    : username
    ? data?.getPostsByUsername
    : data?.getPostList;

  return (
    <div className="mt-5 space-y-4">
      {posts?.map(post => (
        <Post key={post.id} post={post} />
      ))}
      {(username && posts?.length === 0) && (
        <div className="text-white text-xl font-semibold">hmm... u/{username} hasn't posted anything or they don't exist</div>
      )}
    </div>
  )
}

export default Feed