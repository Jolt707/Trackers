<template>
  <VCard class="mt-6 w-25 mr-4">
    <VCardTitle class="mb-4">{{ props.task.title }}</VCardTitle>
    <VCardText>DUE: {{ props.task.dueDate }}</VCardText>
    <VCardText>Description: {{ props.task.description }}</VCardText>
    <VCardText>Last Modified: {{ props.task.updatedAt }}</VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { Task } from "@/gql/graphql.ts";

const props = defineProps<{ task: Task }>();
</script>
