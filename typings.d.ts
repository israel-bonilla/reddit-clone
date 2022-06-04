type Comments = {
  created_at: string
  id: number
  post_id: number
  text: string
  username: string
}

type Vote = {
  created_at: string
  id: number
  post_id: number
  vote_type: string
  username: string
}

type Post = {
  created_at: string
  id: number
  subreddit_id: number
  username: string
  title: string
  body: string
  image: string
  comments: Comments[]
  votes: Vote[]
  subreddit: Subreddit[]
}

type Subreddit = {
  created_at: string
  id: number
  topic: string
}