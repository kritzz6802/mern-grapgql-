import { gql } from "@apollo/client";
export const GET_ALL_QUOTES = gql`
query getAllQuotes{
  products{
    name
    price
    discription
    url
    by{ _id fname }
  }
}`;
export const GET_MY_PROFILE = gql`
query getprofile{ user:myprofile{
   fname
   lname
   email
   products{
    id
    name
    price
    discription
    url }
  }
}`;
export const GET_USER_BY_ID = gql`
query getUserById($userId: ID!) {
   user(_id: $userId) {
     _id
     fname
     lname
     email
     products {
      id
      name
      price
      discription
      url }
    }
  }`;