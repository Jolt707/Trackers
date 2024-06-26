<template>
  <AuthCard
    title="Register"
    v-model:username="login.username"
    v-model:password="login.password"
    @auth="doRegister"
  >
    <template #inputs>
      <v-text-field label="Email" v-model="login.email"></v-text-field>
    </template>
  </AuthCard>
</template>

<style scoped></style>

<script setup lang="ts">
import AuthCard from "../components/AuthCard.vue";
import { ref } from "vue";
import { useApolloClient } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.ts";
import { RegisterMutation } from "@/graphql/auth/register.graphql.ts";
import { onMounted } from "vue";

const login = ref({
  username: "",
  password: "",
  email: "",
  loading: false
});

const apolloClient = useApolloClient();
const router = useRouter();
const userStore = useUserStore();
async function doRegister() {
  login.value.loading = true;
  try {
    const {
      data: { register: response }
    } = await apolloClient.client.mutate({
      mutation: RegisterMutation,
      variables: {
        input: {
          username: login.value.username,
          password: login.value.password,
          email: login.value.email
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
  document.title = "Register";
});
</script>
