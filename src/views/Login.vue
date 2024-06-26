<script setup lang="ts">
import AuthCard from "../components/AuthCard.vue";
import { ref } from "vue";

const login = ref({
  username: "",
  password: ""
});
</script>

<template>
  <AuthCard
    title="Deez"
    v-model:username="login.username"
    v-model:password="login.password"
  />
</template>

<style scoped></style>
