import { gql } from "@apollo/client";

export const GET_ALL_HOSPITAL = gql`
  query getAllHospital {
    getAllHospital {
        hospitalID
        staffID
        hospitalName
        hospitalDescription
        imageUrl
    }
  }
`;
