/*
 * Name: Jensen Stamp
 * Description: Update Class mutation (sends id back to the frontend)
 * Date: 2/8/24
 */
import { gql } from "@apollo/client";

export const UPDATE_CLASS_QUERY = gql`
  mutation UpdateClass($input: UpdateClassInput!) {
    updateClass(input: $input) {
      id
    }
  }
`;
