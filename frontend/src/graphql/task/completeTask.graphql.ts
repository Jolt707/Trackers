import { gql } from "@apollo/client";

export const COMPLETE_TASK_QUERY = gql`
  mutation CompleteTask($input: CompleteTaskInput!) {
    completeTask(input: $input) {
      id
    }
  }
`;
