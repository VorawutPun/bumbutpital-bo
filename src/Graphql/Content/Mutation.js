import { gql } from "@apollo/client";

export const CREATE_CONTENT = gql`
  mutation createContent(
    $title: String!
    $description: String!
    $pictureUrl: String!
    $appropiatePHQSeverity: String!
    $contenttype: String!
  ) {
    createContent(
      title: $title
      description: $description
      pictureUrl: $pictureUrl
      appropiatePHQSeverity: $appropiatePHQSeverity
      contenttype: $contenttype
    ) {
      contentID
      title
      description
      pictureUrl
      appropiatePHQSeverity
      contenttype
    }
  }
`;

export const DELETE_CONTENT = gql`
  mutation deleteContent($contentID: ID!) {
    deleteContent(contentID: $contentID) {
      message
    }
  }
`;
