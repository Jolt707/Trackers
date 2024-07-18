import { gql } from "@apollo/client";

export const CREATE_TASK_QUERY = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      createdAt
      description
      dueDate
      id
      notes
      priority
      title
      updatedAt
    }
  }
`;
