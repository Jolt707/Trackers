<!--
Name: Jensen Stamp
Description: This is the register page
Details: This page uses the AuthCard.vue component
Date: 2/8/24
-->
<template>
  <!--
  AuthCard component sends the username and password to be set to the login variable
  Then the doRegister function is called
  -->
  <AuthCard
    title="Register"
    v-model:username="login.username"
    v-model:password="login.password"
    @auth="doRegister"
  >
    <template #inputs>
      <!-- Slot to add another text field specifically for registering -->
      <VTextField label="Email" v-model="login.email"></VTextField>
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

// Login details
const login = ref({
  username: "",
  password: "",
  email: "",
  loading: false
});

const apolloClient = useApolloClient();
const router = useRouter();
const userStore = useUserStore();

// doRegister function to create a new account with the input details
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

    // Sets the local storage token to sign in
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
