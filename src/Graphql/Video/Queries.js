import { gql } from "@apollo/client";

export const GET_ALL_VIDEO = gql`
query getAllVideo {
  getAllVideo {
    videoID
    title
    videoUrl
    pictureUrl
    createAt
    appropiatePHQSeverity
  }
}
`;

export const GET_VIDEO = gql`
query getVideo($videoID: ID!) {
  getVideo(videoID: $videoID) {
    title
    videoUrl
    pictureUrl
    createAt
    appropiatePHQSeverity
  }
}
`;


export const COUNT_VIDEO = gql`
  query {
    countVideo
  }
`