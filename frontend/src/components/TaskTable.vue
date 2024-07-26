<template>
  <VToolbar class="px-6">Task Table</VToolbar>
  <VDataTable
    :headers="tableHeader"
    :items="tasks"
    :sort-by="[{ key: 'dueDate', order: 'desc' }]"
  >
    <template #item.description="{ item }">
      <div style="max-width: 150px" class="text-truncate">
        {{ item.description }}
      </div>
    </template>
    <template #item.notes="{ item }">
      <div style="max-width: 150px" class="text-truncate">
        {{ item.notes }}
      </div>
    </template>
    <template #item.dueDate="{ item }">
      <div style="max-width: 150px" class="text-truncate">
        {{ new Date(item.dueDate).toLocaleString() }}
      </div>
    </template>
    <template #item.updatedAt="{ item }">
      <div style="max-width: 150px" class="text-truncate">
        {{ new Date(item.updatedAt).toLocaleString() }}
      </div>
    </template>
  </VDataTable>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Task } from "@/gql/graphql.ts";
import { getTasks } from "@/composables/getTasks.ts";

const tasks = ref<Task[]>([]);

const tableHeader = [
  { key: "title", title: "Title" },
  { key: "description", title: "Description" },
  { key: "notes", title: "Notes" },
  { key: "dueDate", title: "Due Date" },
  { key: "updatedAt", title: "Last Modified" },
  { key: "priority", title: "Priority" }
];

onMounted(async () => {
  tasks.value = await getTasks();
});
</script>
