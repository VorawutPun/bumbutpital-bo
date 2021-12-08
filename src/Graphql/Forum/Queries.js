import { gql } from "@apollo/client";

export const GET_ALL_FORUM = gql`
  query getAllForum {
    getAllForum {
      forumID
      staffID
      userID
      title
      description
      createAt
      answer
    }
  }
`;

export const GET_FORUM = gql`
  query getForum($userID: ID!) {
    getContent(userID: $userID){
      staffID
      userID
      title
      description
      createAt
      answer
    }
  }
`

export const COUNT_FORUM = gql`
  query {
    countForum
  }
`