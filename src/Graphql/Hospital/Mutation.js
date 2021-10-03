import { gql } from "@apollo/client";

export const CREATE_PROMOTION = gql`
  mutation createHospital(
    $staffID: String!
    $hospitalName: String!
    $hospitalDescription: String!
    $imageUrl: String!
  ) {
    createHospital(
        staffID: $staffID
        hospitalName: $hospitalName
        hospitalDescription: $hospitalDescription
        imageUrl: $imageUrl
    ) {
        hospitalID
        staffID
        hospitalName
        hospitalDescription
        imageUrl
    }
  }
`;

export const DELETE_PROMOTION = gql`
  mutation deleteHospital($hospitalID: ID!) {
    deleteHospital(hospitalID: $hospitalID) {
      message
    }
  }
`;