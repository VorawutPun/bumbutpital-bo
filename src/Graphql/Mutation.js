import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
    $name: String!
    $surname: String!
    $username: String!
    $password: String!
    $email: String!
    $phoneNumber: String!
  ) {
    createUser(
        name: $name, 
        surname: $surname,
        username: $username, 
        password: $password,
        email: $email,
        phoneNumber: $phoneNumber,
        ) {
      id
      name
      surname
      username
      password
      email
      phoneNumber
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword(
    $username: String!
    $oldPassword: String!
    $newPassword: String!
  ) {
    updatePassword(
      username: $username
      oldPassword: $oldPassword
      newPassword: $newPassword
    ) {
      message
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      message
    }
  }
`;
