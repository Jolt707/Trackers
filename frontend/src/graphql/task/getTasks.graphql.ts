import { gql } from "@apollo/client";

export const GET_TASKS_QUERY = gql`
  query Tasks {
    tasks {
      id
      title
      description
      notes
      createdAt
      dueDate
      priority
      updatedAt
    }
  }
`;
