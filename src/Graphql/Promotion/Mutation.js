import { gql } from "@apollo/client";

export const CREATE_PROMOTION = gql`
  mutation createPromotion(
    $hospitalId: String!
    $userId: String!
    $title: String!
    $hospitalDetail: String!
    $Url: String!
    $couponCode: String!
    $expiredDate: String!
  ) {
    createPromotion(
        hospitalId: $hospitalId
        userId: $userId
        title: $title
        hospitalDetail: $hospitalDetail
        Url: $Url
        couponCode: $couponCode
        expiredDate: $expiredDate
    ) {
        hospitalId
        userId
        title
        hospitalDetail
        Url
        couponCode
        expiredDate
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
