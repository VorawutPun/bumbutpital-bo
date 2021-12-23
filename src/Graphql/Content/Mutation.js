import { gql } from "@apollo/client";

export const CREATE_CONTENT = gql`
  mutation createContent(
    $title: String!
    $description: String!
    $pictureUrl: String!
    $appropiatePHQSeverity: String!
  ) {
    createContent(
      title: $title
      description: $description
      pictureUrl: $pictureUrl
      appropiatePHQSeverity: $appropiatePHQSeverity
    ) {
      contentID
      title
      description
      pictureUrl
      appropiatePHQSeverity
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

export const UPDATE_CONTENT = gql`
  mutation updateContent(
    $contentID: ID!
    $title: String!
    $description: String!
    $pictureUrl: String!
    $appropiatePHQSeverity: String!
  ) {
    updateContent(
      contentID: $contentID
      title: $title
      description: $description
      pictureUrl: $pictureUrl
      appropiatePHQSeverity: $appropiatePHQSeverity
    ) {
      contentID
      title
      description
      pictureUrl
      appropiatePHQSeverity
    }
  }
`;
