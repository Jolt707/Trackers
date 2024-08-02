/*
 * Name: Jensen Stamp
 * Description: Create task mutation (sends the id back to the frontend)
 * Date: 2/8/23
 */
import { gql } from "@apollo/client";

export const CREATE_TASK_QUERY = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
    }
  }
`;
