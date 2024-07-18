<template>
  <h1>Tasks</h1>
  <TaskList></TaskList>
</template>

<style scoped></style>

<script setup lang="ts">
import { onMounted } from "vue";
import TaskList from "@/components/TaskList.vue";

onMounted(() => {
  document.title = "Tasks";
});
</script>
