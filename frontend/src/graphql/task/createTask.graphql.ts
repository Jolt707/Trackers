import { gql } from "@apollo/client";

export const CREATE_TASK_QUERY = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      userId
      title
      description
      notes
      createdAt
      dueDate
      priority
      updatedAt
      completedTask
    }
  }
`;
