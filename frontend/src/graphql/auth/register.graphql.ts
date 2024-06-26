import {gql} from "@apollo/client";

export const RegisterMutation = gql`mutation Register($input: UserInput!) {
  register(input: $input) {
    token
    user {
    username
    }
  }
}`