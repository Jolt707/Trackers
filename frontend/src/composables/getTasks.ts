/*
Name: Jensen Stamp
Description: Function to get the tasks from a query, used to refresh after most functions edit a task
Date: 11/08/24
*/
import { useApolloClient } from "@vue/apollo-composable";
import { GET_TASKS_QUERY } from "@/graphql/task/getTasks.graphql.ts";

export async function getTasks(completedTask: boolean = false) {
  const apollo = useApolloClient();
  const {
    data: { tasks: tasksList }
  } = await apollo.client.query({
    query: GET_TASKS_QUERY,
    fetchPolicy: "network-only",
    variables: {
      input: {
        completedTask: completedTask
      }
    }
  });
  return tasksList;
}
