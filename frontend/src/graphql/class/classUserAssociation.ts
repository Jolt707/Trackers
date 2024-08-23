/*
 * Name: Jensen Stamp
 * Description: Complete task mutation (sends the id back to the frontend)
 * Date: 6/8/24
 */

import { gql } from "@apollo/client";

export const CLASS_USER_ASSOCIATION_MUTATION = gql`
  mutation AddUsersToClass($input: ClassUserAssociationInput!) {
    addUsersToClass(input: $input) {
      id
      userId
      classId
    }
  }
`;
