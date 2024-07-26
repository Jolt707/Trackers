<template>
  <VContainer>
    <h1>Task History</h1>
    <TaskTable :status="true"></TaskTable>
  </VContainer>
</template>

<script setup lang="ts">
import TaskTable from "@/components/TaskTable.vue";
import { onMounted } from "vue";

onMounted(() => {
  document.title = "Task History";
});
</script>
