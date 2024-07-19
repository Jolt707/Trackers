import { gql } from "@apollo/client";

export const DELETE_TASK_QUERY = gql`
  mutation DeleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input)
  }
`;
