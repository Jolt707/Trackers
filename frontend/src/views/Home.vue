<template>
  <template v-if="!userStore.user">
    <h1>Logged out Home</h1>
  </template>
  <template v-else>
    <h1>Logged in {{ userStore.user.username }}</h1>
  </template>
</template>

<style scoped></style>

<script setup lang="ts">
import { useUserStore } from "@/stores/user.ts";
import { onMounted } from "vue";

const userStore = useUserStore();

onMounted(() => {
  document.title = "Home";
});
</script>
