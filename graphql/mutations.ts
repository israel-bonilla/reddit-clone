import { gql } from "@apollo/client";

export const ADD_SUBREDDIT = gql`
  mutation MyMutation($topic: String!) {
    insertSubreddit(topic: $topic) {
      id
      created_at
      topic
    }
  }
`;

export const ADD_VOTE = gql`
  mutation MyMutation($post_id: ID!, $username: String!, $vote_type: String!) {
    insertVote(post_id: $post_id, username: $username, vote_type: $vote_type) {
      id
      created_at
      post_id
      username
      vote_type
    }
  }
`;

export const REMOVE_VOTE = gql`
  mutation MyMutation($id: ID!) {
    deleteVote(id: $id) {
      id
      created_at
      post_id
      username
      vote_type
    }
  }
`;

export const ADD_POST = gql`
  mutation MyMutation(
    $body: String!
    $image: String!
    $subreddit_id: ID!
    $title: String!
    $username: String!
  ) {
    insertPost(
      body: $body
      image: $image
      subreddit_id: $subreddit_id
      title: $title
      username: $username
    ) {
      id
      created_at
      subreddit_id
      username
      title
      body
      image
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation MyMutation(
    $post_id: ID!
    $username: String!
    $text: String!
  ) {
    insertComment(
      post_id: $post_id
      username: $username
      text: $text
    ) {
      id
      created_at
      post_id
      username
      text
    }
  }
`;