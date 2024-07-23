import { gql } from "@apollo/client";

export const UPDATE_TASK_QUERY = gql`mutation UpdateTask($input: UpdateTaskInput!) {
  updateTask(input: $input) {
    id
  }
}`
