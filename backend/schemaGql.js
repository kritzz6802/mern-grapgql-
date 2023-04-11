import { gql } from 'apollo-server';

const typeDefs = gql`
type Query{
    users:[User]
    products:[ProductWithName]
    user(_id:ID!):User
    iproducts(by:ID!):[Product]
    myprofile:User
}
type User{
    _id:ID!
    fname:String!
    lname:String!
    email:String!
    password:String!
    products:[ProductWithName]
}
type Product{
    by:ID!
    discription:String
    price:String
    name:String
    url:String
}
type Token{
    token:String!
}
type ProductWithName{
    id:ID
    name:String
    discription:String
    price:String
    url:String
    by:IdName
}
type IdName{
    _id:String
    fname:String
}
input UserInput{
    fname:String!
    lname:String!
    email:String!
    password:String!
}
input UserSigninInput{
    email:String!
    password:String!
}
input product{
    name:String
    discription:String
    price:String
    url:String
}
type Mutation{
    signupUser(userNew:UserInput!):User
    signinUser(userSignin:UserSigninInput!):Token
    createProduct(addproduct:product!):ProductWithName
    deleteProduct(id:ID):ProductWithName
}
`;
export default typeDefs;