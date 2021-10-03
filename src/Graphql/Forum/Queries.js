import { gql } from "@apollo/client";

export const GET_ALL_FORUM = gql`
  query getAllForum {
    getAllForum {
      forumID
      userID
      staffID
      title
      description
      createAt
      answer
    }
  }
`;