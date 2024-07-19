<template>
  <VToolbar class="px-6">Task Table</VToolbar>
  <VDataTable
    :headers="tableHeader"
    :items="tasks"
    :sort-by="[{ key: 'dueDate', order: 'desc' }]"
  ></VDataTable>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Task } from "@/gql/graphql.ts";
import { getTasks } from "@/composables/getTasks.ts";

const tasks = ref<Task[]>([]);

const tableHeader = [
  { key: "title", title: "Title" },
  { key: "description", title: "Description" },
  { key: "updatedAt", title: "Last Modified" },
  { key: "dueDate", title: "Due Date" },
  { key: "priority", title: "Priority" }
];

onMounted(async () => {
  tasks.value = await getTasks();
});
</script>
