import { gql } from "@apollo/client";

export const CREATE_PROMOTION = gql`
  mutation createPromotion(
    $hospitalId: String!
    $userId: String!
    $title: String!
    $hospitalDetail: String!
    $Url: String!
    $couponCode: String!
    $expireDate: String!
  ) {
    createPromotion(
        hospitalId: $hospitalId
        userId: $userId
        title: $title
        hospitalDetail: $hospitalDetail
        Url: $Url
        couponCode: $couponCode
        expireDate: $expireDate
    ) {
        promotionId
        hospitalId
        userId
        title
        hospitalDetail
        Url
        couponCode
        expireDate
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
