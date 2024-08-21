<!--
Name: Jensen Stamp
Description: This is the main table component that displays tasks
Details: The parent pages for this component is TaskHistory.vue and Upcoming.vue
Date: 2/8/24
-->
<template>
  <VToolbar class="px-6 mb-4" style="border-radius: 4px">Task Table</VToolbar>
  <!-- Table that displays the headers from tableHeader and adds the task items -->
  <!-- Also sorts by the sortItem and sortDirection prop -->
  <VDataTable
    style="border-radius: 4px"
    :headers="tableHeader"
    :items="tasks"
    :sort-by="[{ key: sortItem, order: sortDirection }]"
  >
    <!-- Each template is used to add styling and text-truncate (cut text off) -->
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
      <!-- Setting the date to the users locale -->
      <div style="max-width: 150px" class="text-truncate">
        {{ new Date(item.dueDate).toLocaleString() }}
      </div>
    </template>
    <template #item.updatedAt="{ item }">
      <!-- Setting the date to the users locale -->
      <div style="max-width: 150px" class="text-truncate">
        {{ new Date(item.updatedAt).toLocaleString() }}
      </div>
    </template>
  </VDataTable>
</template>

<style scoped>
.v-data-table >>> .v-data-table-header {
  background-color: #191919 !important;
}
</style>
<style>
.v-data-table-header {
  background-color: #191919 !important;
}
</style>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Task } from "@/gql/graphql.ts";
import { getTasks } from "@/composables/getTasks.ts";

// Defining tasks array
const tasks = ref<Task[]>([]);

// Defining the props
const props = defineProps<{
  // Defining status as a boolean (completed or not)
  status: boolean;
  // Defining sortItem to assign a table value to sort by
  sortItem: string;
  // Defining sortDirection to set the direction
  sortDirection: "desc" | "asc";
}>();

// Defining the table values to display
const tableHeader = [
  { key: "title", title: "Title" },
  { key: "description", title: "Description" },
  { key: "notes", title: "Notes" },
  { key: "dueDate", title: "Due Date" },
  { key: "updatedAt", title: "Last Modified" },
  { key: "priority", title: "Priority" }
];

// When the page is mounted (loaded) it will retrieve either the completed or uncompleted task
onMounted(async () => {
  tasks.value = await getTasks(props.status);
});
</script>
