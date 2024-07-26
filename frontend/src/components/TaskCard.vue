<template>
  <VCard class="mt-6 w-33">
    <VCardTitle class="mb-4">{{ props.task.title }}</VCardTitle>
    <VCardText class="text-truncate mt-n2">
      DUE: {{ new Date(task.dueDate).toLocaleString() }}
    </VCardText>
    <VCardText class="text-truncate mt-n2">
      {{ props.task.description }}
    </VCardText>
    <VCardActions class="mt-n4">
      <VBtn color="#ffd707">SET AS COMPLETE</VBtn>
      <VBtn color="#ffd707" to="/tasks?edit=1">EDIT TASK</VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
import { Task } from "@/gql/graphql.ts";

const props = defineProps<{ task: Task }>();
</script>
