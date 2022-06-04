import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import PostBox from '../components/PostBox'
import SubredditRow from '../components/SubredditRow'
import { GET_SUBREDDIT_LIST_WITH_LIMIT } from '../graphql/queries'

const Home: NextPage = () => {
  const { data } = useQuery(GET_SUBREDDIT_LIST_WITH_LIMIT, {
    variables: { limit: 10 },
  });

  const subreddits: Subreddit[] = data?.getSubredditListWithLimit;

  return (
    <div className="max-w-5xl my-7 mx-auto">
      <Head>
        <title>Reddit Clone</title>
        <link rel="icon" href="https://links.israelb.xyz/reddit-clone/reddit-logo.png" />
      </Head>

      <PostBox />

      <div className='flex'>
        <Feed />

        <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-neutral-700 bg-neutral-900 lg:inline">
          <p className="text-md text-neutral-200 mb-1 p-4 pb-3 font-bold">Top Communities</p>
          
          <div>
            {subreddits?.map((subreddit, i) => (
              <SubredditRow key={subreddit.id} topic={subreddit.topic} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
