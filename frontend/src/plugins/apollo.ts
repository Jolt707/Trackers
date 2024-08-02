/*
 * Name: Apollo
 * Description: Apollo plugin (not created by myself)
 * Date: 2/8/24
 */
import { type App } from "vue";
import { createApolloProvider } from "@vue/apollo-option";
import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache
} from "@apollo/client/core";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import { provideApolloClient } from "@vue/apollo-composable";

function getToken() {
  return localStorage.getItem("token");
}

export default function setup(app: App) {
  const httpLink = new HttpLink({
    uri: "/graphql"
  });

  const authLink = new ApolloLink((operation, forward) => {
    const token = getToken();
    operation.setContext({
      headers: {
        Authorization: token
      }
    });
    return forward(operation);
  });

  const cleanTypeName = new ApolloLink((operation, forward) => {
    if (operation.variables) {
      const omitTypename = (key: any, value: any) =>
        key === "__typename" ? undefined : value;
      operation.variables = JSON.parse(
        JSON.stringify(operation.variables),
        omitTypename
      );
    }
    return forward(operation);
  });

  if (import.meta.env.DEV) {
    loadDevMessages();
    loadErrorMessages();
  }

  const appLink = from([cleanTypeName, authLink, httpLink]);

  // Create the apollo client
  const apolloClient = new ApolloClient({
    link: appLink,
    cache: new InMemoryCache({
      addTypename: true
    }),
    connectToDevTools: true
  });

  // Create a provider
  const apolloProvider = createApolloProvider({
    defaultClient: apolloClient
  });

  app.use(apolloProvider);

  provideApolloClient(apolloClient);
}
