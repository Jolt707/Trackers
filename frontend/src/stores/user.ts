/*
Name: Jensen Stamp
Description:
Date: 2/8/24
*/

import { ref } from "vue";
import { defineStore } from "pinia";
import { useApolloClient } from "@vue/apollo-composable";
import { UserQuery } from "@/graphql/user/user.graphql";
import { User } from "@/gql/graphql.ts";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);
  const apolloClient = useApolloClient();

  async function getUser() {
    const {
      data: { currentUser }
    } = await apolloClient.client.query({
      query: UserQuery,
      fetchPolicy: "network-only"
    });

    user.value = currentUser;
  }

  const router = useRouter();

  function logout() {
    localStorage.removeItem("token");
    user.value = null;
    router.push("/");
  }

  return {
    user,
    logout,
    getUser
  };
});
