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
