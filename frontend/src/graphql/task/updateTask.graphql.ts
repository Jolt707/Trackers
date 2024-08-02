/*
 * Name: Jensen Stamp
 * Description: Update Task mutation (sends id back to the frontend)
 * Date: 2/8/23
 */
import { gql } from "@apollo/client";

export const UPDATE_TASK_QUERY = gql`mutation UpdateTask($input: UpdateTaskInput!) {
  updateTask(input: $input) {
    id
  }
}`
