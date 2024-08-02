<!--
Name: Jensen Stamp
Description: This is the login page
Details: This page uses the AuthCard.vue component
Date: 2/8/24
-->
<template>
  <!--
  AuthCard component sends the username and password to be set to the login variable
  Then the doLogin function is called
  -->
  <AuthCard
    title="Login"
    v-model:username="login.username"
    v-model:password="login.password"
    @auth="doLogin"
  />
</template>

<script setup lang="ts">
import AuthCard from "../components/AuthCard.vue";
import { onMounted, ref } from "vue";
import { LoginMutation } from "../graphql/auth/login.graphql.ts";
import { useApolloClient } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user.ts";

// Defines the login details
const login = ref({
  username: "",
  password: "",
  loading: false
});

const apolloClient = useApolloClient();
const router = useRouter();
const userStore = useUserStore();

// doLogin function to login the user with the login details
async function doLogin() {
  login.value.loading = true;
  try {
    const {
      data: { login: response }
    } = await apolloClient.client.mutate({
      mutation: LoginMutation,
      variables: {
        input: {
          username: login.value.username,
          password: login.value.password
        }
      }
    });

    // Sets the local storage token
    localStorage.setItem("token", response.token);
    await userStore.getUser();
    await router.push("/");
  } finally {
    login.value.loading = false;
  }
}

onMounted(() => {
  document.title = "Login";
});
</script>
