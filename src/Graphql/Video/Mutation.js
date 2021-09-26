import { gql } from "@apollo/client";

export const CREATE_VIDEO = gql`
  mutation createVideo(
    $title: String!
    $videoUrl: String!
    $pictureUrl: String!
    $appropiatePHQSeverity: String!
    $staffID: String!
  ) {
    createVideo(
      title: $title
      videoUrl: $videoUrl
      pictureUrl: $pictureUrl
      appropiatePHQSeverity: $appropiatePHQSeverity
      staffID: $staffID
    ) {
      videoID
      title
      videoUrl
      pictureUrl
      appropiatePHQSeverity
      staffID
    }
  }
`;
