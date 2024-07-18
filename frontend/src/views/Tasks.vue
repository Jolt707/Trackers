<template>
  <VContainer>
    <h1>Tasks</h1>
    <TaskList></TaskList>
  </VContainer>
</template>

<style scoped></style>

<script setup lang="ts">
import { onMounted } from "vue";
import TaskList from "@/components/TaskList.vue";

onMounted(() => {
  document.title = "Tasks";
});
</script>
