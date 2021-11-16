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
      role
    }
  }
`;

export const GET_USER = gql`
query getUser($id: ID!) {
  getUser(id: $id) {
    username
    name
    surname
    email
    phoneNumber
    appropiatePHQSeverity
    appropiatePHQSeverityScore
    role
  }
}
`;

export const COUNT_USER = gql`
  query {
    countUser
  }
`
export const TOTAL_PHQ9 = gql`
  query {
    totalPHQ9
  }
`

export const GET_CURRENT_USER = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      username
      password
      name
      surname
      email
      phoneNumber
      role
    }
  }
`
