import { gql } from "@apollo/client";
export const SIGNUP_USER = gql`
mutation createuser($userNew:UserInput!){
  user:signupUser(userNew:$userNew) {
      fname
    }
  }
`;
export const LOGIN_USER = gql`
mutation SigninUser($userSignin:UserSigninInput!){
  user:signinUser(userSignin:$userSignin) {
    token
  }
}
`;
export const CREATE_QUOTE = gql`
mutation CreateProduct($addproduct: product!) {
  quote:createProduct(addproduct: $addproduct) {
    id
     name
     price
     discription
     url
      }
    }
`;
export const DELETE_PRODUCT = gql`
mutation deleteProduct($id: ID) {
  deleteProduct(id: $id) {
    id
  }
}
`;


