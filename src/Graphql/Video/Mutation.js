import { gql } from "@apollo/client";

export const CREATE_VIDEO = gql`
  mutation createVideo(
    $title: String!
    $videoUrl: String!
    $pictureUrl: String!
    $createAt: String!
    $appropiatePHQSeverity: String!
    $staffID: String!
  ) {
    createVideo(
      title: $title
      videoUrl: $videoUrl
      pictureUrl: $pictureUrl
      createAt: $createAt
      appropiatePHQSeverity: $appropiatePHQSeverity
      staffID: $staffID
    ) {
      videoID
      title
      videoUrl
      pictureUrl
      createAt
      appropiatePHQSeverity
      staffID
    }
  }
`;
