import { gql } from "@apollo/client";

export const GET_TASKS_QUERY = gql`
  query Tasks($input: TaskStatusInput!) {
    tasks(input: $input) {
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
