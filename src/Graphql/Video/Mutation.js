import { gql } from "@apollo/client";

export const CREATE_VIDEO = gql`
  mutation createVideo(
    $title: String!
    $videoUrl: String!
    $pictureUrl: String!
    $appropiatePHQSeverity: String!
  ) {
    createVideo(
      title: $title
      videoUrl: $videoUrl
      pictureUrl: $pictureUrl
      appropiatePHQSeverity: $appropiatePHQSeverity
    ) {
      videoID
      title
      videoUrl
      pictureUrl
      appropiatePHQSeverity
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

export const UPDATE_VIDEO = gql`
  mutation updateVideo(
    $videoID: ID!
    $title: String!
    $videoUrl: String!
    $pictureUrl: String!
    $appropiatePHQSeverity: String!
  ) {
    updateVideo(
      videoID: $videoID
      title: $title
      videoUrl: $videoUrl
      pictureUrl: $pictureUrl
      appropiatePHQSeverity: $appropiatePHQSeverity
    ) {
      videoID
      title
      videoUrl
      pictureUrl
      appropiatePHQSeverity
    }
  }
`;
