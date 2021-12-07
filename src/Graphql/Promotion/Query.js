import { gql } from "@apollo/client";

export const GET_ALL_PROMOTION = gql`
  query getAllPromotion {
    getAllPromotion {
        promotionId
        hospitalId
        createAt
        title
        hospitalDetail
        Url
        expiredDate
    }
  }
`;

export const GET_PROMOTION = gql`
query getPromotion($promotionId: ID!) {
  getPromotion(promotionId: $promotionId) {
    hospitalId
    createAt
    title
    hospitalDetail
    Url
    expiredDate
    couponCode
  }
}
`;
