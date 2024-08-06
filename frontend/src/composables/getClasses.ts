import { useApolloClient } from "@vue/apollo-composable";
import { GET_CLASSES_QUERY } from "@/graphql/class/getClasses.graphql.ts";

export async function getClasses() {
  const apollo = useApolloClient();
  const {
    data: { classes: classesList }
  } = await apollo.client.query({
    query: GET_CLASSES_QUERY,
    fetchPolicy: "network-only"
  });
  return classesList;
}
