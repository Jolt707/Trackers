<!--
Name: Jensen Stamp
Description: UNFINISHED
Details: UNFINISHED
Date: 2/8/24
-->
<template>
  <!-- Large title -->
  <h1>Assigned</h1>
  <div class="d-flex">
    <VIcon size="150px" class="">mdi-close-circle-outline</VIcon>
    <h3>No Assigned Tasks</h3>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  document.title = "Assigned";
});
</script>
