import { gql } from "@apollo/client";

export const ANSWER_FORUM = gql`
  mutation answerForum($forumID: ID!, $answer: String!) {
    answerForum(forumID: $forumID, answer: $answer) {
      forumID
      answer
    }
  }
`;