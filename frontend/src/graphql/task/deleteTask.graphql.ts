/*
 * Name: Jensen Stamp
 * Description: Delete task mutation (sends nothing back to the frontend, because the task is deleted)
 * Date: 2/8/23
 */
import { gql } from "@apollo/client";

export const DELETE_TASK_QUERY = gql`
  mutation DeleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input)
  }
`;
