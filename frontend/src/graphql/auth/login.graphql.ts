/*
 * Name: Jensen Stamp
 * Description: Login mutation (returns the token and user)
 * Date: 2/8/24
 */
import { gql } from "@apollo/client";

export const LoginMutation = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        username
      }
    }
  }
`;
