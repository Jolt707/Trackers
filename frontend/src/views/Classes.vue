<!--
Name: Jensen Stamp
Description: Classes page, shows the classes and tasks for a student
Details: Uses ClassesList.vue
Date: 11/8/24
-->
<template>
  <VContainer>
    <h1>Classes</h1>
    <ClassesList></ClassesList>
  </VContainer>
</template>

<script setup lang="ts">
import ClassesList from "@/components/ClassesList.vue";
</script>
