/*
 * Name: Jensen Stamp
 * Description: Register mutation (returns the token and user)
 * Date: 2/8/23
 */
import { gql } from "@apollo/client";

export const RegisterMutation = gql`
  mutation Register($input: UserInput!) {
    register(input: $input) {
      token
      user {
        username
      }
    }
  }
`;
