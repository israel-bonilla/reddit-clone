import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query MyQuery {
    getPostList {
      id
      body
      created_at
      image
      title
      username
      subreddit_id
      comments {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        vote_type
        username
      }
    }
  }
`;

export const GET_POST_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getPostByPostId(post_id: $post_id) {
      id
      body
      created_at
      image
      title
      username
      subreddit_id
      comments {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        vote_type
        username
      }
    }
  }
`;

export const GET_POSTS_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getPostsByTopic(topic: $topic) {
      id
      body
      created_at
      image
      title
      username
      subreddit_id
      comments {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        vote_type
        username
      }
    }
  }
`;

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;

export const GET_COMMENTS_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getCommentsByPostId(post_id: $post_id) {
      id
      created_at
      post_id
      username
      text
    }
  }
`;

export const GET_VOTES_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getVotesByPostId(post_id: $post_id) {
      id
      created_at
      post_id
      username
      vote_type
    }
  }
`;

export const GET_SUBREDDIT_LIST_WITH_LIMIT = gql`
  query MyQuery($limit: Int!) {
    getSubredditListWithLimit(limit: $limit) {
      id
      created_at
      topic
    }
  }
`;