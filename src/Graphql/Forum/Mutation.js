import { gql } from "@apollo/client";

export const ANSWER_FORUM = gql`
  mutation answerForum($forumID: String!, $adminAnswer: String!) {
    answerForum(forumID: $forumID, adminAnswer: $adminAnswer) {
      message
    }
  }
`;