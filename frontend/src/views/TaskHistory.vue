<script setup lang="ts">
import TaskTable from "@/components/TaskTable.vue";
</script>

<template>
  <VContainer>
    <h1>Task History</h1>
    <TaskTable
      :status="true"
      sortItem="updatedAt"
      sortDirection="desc"
    ></TaskTable>
  </VContainer>
</template>

<style scoped></style>
