<!--
Name: Jensen Stamp
Description: This is the tasks page
Details: This page uses the TaskList.vue component
Date: 2/8/24
-->
<template>
  <VContainer>
    <h1>Tasks</h1>
    <TaskList></TaskList>
  </VContainer>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import TaskList from "@/components/TaskList.vue";

onMounted(() => {
  document.title = "Tasks";
});
</script>
