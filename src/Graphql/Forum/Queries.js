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

export const COUNT_FORUM = gql`
  query {
    countForum
  }
`