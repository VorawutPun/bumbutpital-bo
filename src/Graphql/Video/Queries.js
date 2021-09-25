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
    staffID
  }
}
`;