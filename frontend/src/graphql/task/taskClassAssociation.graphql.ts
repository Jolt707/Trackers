/*
 * Name: Jensen Stamp
 * Description: Complete task mutation (sends the id back to the frontend)
 * Date: 6/8/23
 */

import { gql } from "@apollo/client";

export const TASK_CLASS_ASSOCIATION_MUTATION = gql`
  mutation AddClassesToTask($input: TaskClassAssociationInput!) {
    addClassesToTask(input: $input) {
      id
      taskId
      classId
    }
  }
`;
