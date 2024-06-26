<script setup lang="ts">
import AuthCard from "../components/AuthCard.vue";
import { ref } from "vue";

const login = ref({
  username: "",
  password: "",
  email: ""
});
</script>

<template>
  <AuthCard
    title="Deez"
    v-model:username="login.username"
    v-model:password="login.password"
  >
    <template #inputs>
      <v-text-field label="Email" v-model="login.email"></v-text-field>
    </template>
  </AuthCard>
</template>

<style scoped></style>
