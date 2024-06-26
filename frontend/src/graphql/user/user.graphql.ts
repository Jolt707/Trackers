import {gql} from "@apollo/client";

export const UserQuery = gql`
    query CurrentUser {
  currentUser {
    id
    username
    password
    avatar
    createdAt
    updatedAt
    admin
    email
  }
}`