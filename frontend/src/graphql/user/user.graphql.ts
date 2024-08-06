/*
 * Name: Jensen Stamp
 * Description:
 * Date: 2/8/24
 */
import { gql } from "@apollo/client";

export const UserQuery = gql`
  query CurrentUser {
    currentUser {
      id
      username
      password
      avatar
      createdAt
      updatedAt
      accountType
      email
    }
  }
`;
