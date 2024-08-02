<!--
Name: Jensen Stamp
Description: This is the register page
Details: This page uses the AuthCard.vue component
Date: 2/8/24
-->
<template>
  <VContainer>
    <h1>Upcoming</h1>
    <TaskTable
      :status="false"
      sortItem="dueDate"
      sortDirection="asc"
    ></TaskTable>
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
