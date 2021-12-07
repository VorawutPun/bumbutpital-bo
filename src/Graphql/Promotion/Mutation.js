import { gql } from "@apollo/client";

export const CREATE_PROMOTION = gql`
  mutation createPromotion(
    $hospitalId: String!
    $title: String!
    $hospitalDetail: String!
    $Url: String!
    $couponCode: String!
    $expiredDate: String!
  ) {
    createPromotion(
      hospitalId: $hospitalId
      title: $title
      hospitalDetail: $hospitalDetail
      Url: $Url
      couponCode: $couponCode
      expiredDate: $expiredDate
    ) {
      hospitalId
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

export const UPDATE_PROMOTION = gql`
  mutation updatePromotion(
    $promotionId: ID!
    $hospitalId: String!
    $userId: String!
    $title: String!
    $hospitalDetail: String!
    $Url: String!
    $expiredDate: String!
  ) {
    updatePromotion(
      promotionId: $promotionId
      hospitalId: $hospitalId
      userId: $userId
      title: $title
      hospitalDetail: $hospitalDetail
      Url: $Url
      expiredDate: $expiredDate
    ) {
      promotionId
      hospitalId
      userId
      title
      hospitalDetail
      Url
      expiredDate
    }
  }
`;
