/*
Name: Jensen Stamp
Description: Function to get the classes from a query, used to refresh after most functions edit a class
Date: 11/08/24
*/
import { useApolloClient } from "@vue/apollo-composable";
import { GET_CLASSES_QUERY } from "@/graphql/class/getClasses.graphql.ts";

export async function getClasses() {
  if (!localStorage.getItem("token")) return [];
  const apollo = useApolloClient();
  const {
    data: { classes: classesList }
  } = await apollo.client.query({
    query: GET_CLASSES_QUERY,
    fetchPolicy: "network-only"
  });
  return classesList;
}
