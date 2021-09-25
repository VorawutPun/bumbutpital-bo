import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      id
      username
      password
      name
      surname
      email
      phoneNumber
    }
  }
`;

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

