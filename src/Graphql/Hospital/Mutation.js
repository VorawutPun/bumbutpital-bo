import { gql } from "@apollo/client";

export const CREATE_HOSPITAL = gql`
  mutation createHospital(
    $hospitalName: String!
    $hospitalDescription: String!
    $imageUrl: String!
  ) {
    createHospital(
      hospitalName: $hospitalName
      hospitalDescription: $hospitalDescription
      imageUrl: $imageUrl
    ) {
      hospitalID
      hospitalName
      hospitalDescription
      imageUrl
    }
  }
`;

export const DELETE_HOSPITAL = gql`
  mutation deleteHospital($hospitalID: ID!) {
    deleteHospital(hospitalID: $hospitalID) {
      message
    }
  }
`;

export const UPDATE_HOSPITAL = gql`
  mutation updateHospital(
    $hospitalID: ID!
    $hospitalName: String!
    $hospitalDescription: String!
    $imageUrl: String!
  ) {
    updateHospital(
      hospitalID: $hospitalID
      hospitalName: $hospitalName
      hospitalDescription: $hospitalDescription
      imageUrl: $imageUrl
    ) {
      hospitalID
      hospitalName
      hospitalDescription
      imageUrl
    }
  }
`;