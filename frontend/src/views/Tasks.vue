<template>
  <h1>Tasks</h1>
</template>

<style scoped></style>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  document.title = "Tasks";
});
</script>
