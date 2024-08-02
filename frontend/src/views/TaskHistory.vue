<!--
Name: Jensen Stamp
Description: This is the task history page
Details: This page uses the TaskTable.vue component
Date: 2/8/24
-->
<template>
  <VContainer>
    <h1>Task History</h1>
    <!-- Sets the status to true to display completed tasks, also sets the item and direction to sort by -->
    <TaskTable
      :status="true"
      sortItem="updatedAt"
      sortDirection="desc"
    ></TaskTable>
  </VContainer>
</template>

<script setup lang="ts">
import TaskTable from "@/components/TaskTable.vue";
import { onMounted } from "vue";

onMounted(() => {
  document.title = "Task History";
});
</script>
