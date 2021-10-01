import { gql } from "@apollo/client";

export const CREATE_PROMOTION = gql`
  mutation createPromotion(
    $hospitalId: String!
    $userId: String!
    $title: String!
    $hospitalDetail: String!
    $Url: String!
    $couponCode: String!
  ) {
    createPromotion(
        hospitalId: $hospitalId
        userId: $userId
        title: $title
        hospitalDetail: $hospitalDetail
        Url: $Url
        couponCode: $couponCode
    ) {
        promotionId
        hospitalId
        userId
        title
        hospitalDetail
        Url
        couponCode
    }
  }
`;

export const DELETE_PROMOTION = gql`
  mutation deletePromotion($promotionId: ID!) {
    deletePromotion(promotionId: $promotionId) {
      message
    }
  }
`;
