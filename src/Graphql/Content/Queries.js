import { gql } from "@apollo/client";

export const GET_ALL_CONTENT = gql`
  query getAllContent {
    getAllContent {
      contentID
      title
      description
      updateTime
      pictureUrl
      createAt
      appropiatePHQSeverity
    }
  }
`;

export const GET_CONTENT = gql`
  query getContent($contentID: ID!) {
    getContent(contentID: $contentID) {
      title
      description
      pictureUrl
      appropiatePHQSeverity
      contenttype
    }
  }
`;
