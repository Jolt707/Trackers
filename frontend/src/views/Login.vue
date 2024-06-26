<template>
  <AuthCard
    title="Login"
    v-model:username="login.username"
    v-model:password="login.password"
    @auth="doLogin"
  />
</template>

<style scoped></style>

<script setup lang="ts">
import AuthCard from "../components/AuthCard.vue";
import { onMounted, ref } from "vue";
import { LoginMutation } from "../graphql/auth/login.graphql.ts";
import { useApolloClient } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user.ts";

const login = ref({
  username: "",
  password: "",
  loading: false
});

const apolloClient = useApolloClient();
const router = useRouter();
const userStore = useUserStore();
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
