/*
 * Name: Jensen Stamp
 * Description: Complete task mutation (sends the id back to the frontend)
 * Date: 6/8/23
 */

import { gql } from "@apollo/client";

export const CREATE_CLASS_QUERY = gql`
  mutation CreateClass($input: CreateClassInput!) {
    createClass(input: $input) {
      id
      teacherId
      name
      createdAt
      updatedAt
    }
  }
`;
