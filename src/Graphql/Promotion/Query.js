import { gql } from "@apollo/client";

export const GET_ALL_PROMOTION = gql`
  query getAllPromotion {
    getAllPromotion {
        promotionId
        hospitalId
        userId
        createAt
        title
        hospitalDetail
        Url
    }
  }
`;
