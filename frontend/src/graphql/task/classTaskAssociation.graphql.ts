/*
 * Name: Jensen Stamp
 * Description: Complete task mutation (sends the id back to the frontend)
 * Date: 6/8/23
 */

import { gql } from "@apollo/client";

export const CLASS_TASK_ASSOCIATION_MUTATION = gql`
  mutation AddTaskToClass($input: ClassTaskAssociationInput!) {
    addTasksToClass(input: $input) {
      id
      taskId
      classId
    }
  }
`;
