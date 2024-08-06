/*
 * Name: Jensen Stamp
 * Description: Get tasks query (sends task details to the frontend)
 * Date: 6/8/23
 */
import { gql } from "@apollo/client";

export const GET_CLASSES_QUERY = gql`
  query Classes {
    classes {
      id
      teacherId
      name
      createdAt
      updatedAt
      students {
        id
        username
        createdAt
        updatedAt
        email
      }
    }
  }
`;
