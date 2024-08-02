/*
 * Name: Jensen Stamp
 * Description: Complete task mutation (sends the id back to the frontend)
 * Date: 2/8/23
 */

import { gql } from "@apollo/client";

export const COMPLETE_TASK_QUERY = gql`
  mutation CompleteTask($input: CompleteTaskInput!) {
    completeTask(input: $input) {
      id
    }
  }
`;
