/*
 * Name: Jensen Stamp
 * Description: Delete class mutation (sends nothing back to the frontend, because the class is deleted)
 * Date: 2/8/23
 */
import { gql } from "@apollo/client";

export const DELETE_CLASS_QUERY = gql`
  mutation DeleteClass($input: DeleteClassInput!) {
    deleteClass(input: $input)
  }
`;
