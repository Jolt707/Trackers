<template>
  <template v-if="!userStore.user">
    <v-card-title class="d-flex justify-center text-lg-h3">Trackers</v-card-title>
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
