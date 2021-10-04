import { gql } from "@apollo/client";

export const CREATE_VIDEO = gql`
  mutation createVideo(
    $title: String!
    $videoUrl: String!
    $pictureUrl: String!
    $appropiatePHQSeverity: String!
    $staffID: String!
    $videoType: String!
  ) {
    createVideo(
      title: $title
      videoUrl: $videoUrl
      pictureUrl: $pictureUrl
      appropiatePHQSeverity: $appropiatePHQSeverity
      staffID: $staffID
      videoType: $videoType
    ) {
      videoID
      title
      videoUrl
      pictureUrl
      appropiatePHQSeverity
      staffID
      videoType
    }
  }
`;

export const DELETE_VIDEO = gql`
  mutation deleteVideo($videoID: ID!) {
    deleteVideo(videoID: $videoID) {
      message
    }
  }
`;
