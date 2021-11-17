import { gql } from "@apollo/client";

export const GET_ALL_HOSPITAL = gql`
  query getAllHospital {
    getAllHospital {
        hospitalID
        hospitalName
        hospitalDescription
        imageUrl
    }
  }
`;

export const GET_HOSPITAL = gql`
query getHospital($hospitalID: ID!) {
  getHospital(hospitalID: $hospitalID) {
    hospitalName
    hospitalDescription
    imageUrl
  }
}
`;

