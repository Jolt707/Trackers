<template>
  <VContainer>
    <h1>Upcoming</h1>
    <TaskTable :status="false"></TaskTable>
  </VContainer>
</template>

<style scoped></style>

<script setup lang="ts">
import { onMounted } from "vue";
import TaskTable from "@/components/TaskTable.vue";

onMounted(() => {
  document.title = "Upcoming";
});
</script>
