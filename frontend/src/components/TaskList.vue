<template>
  <VToolbar class="px-6">
    <TaskDialog
      v-model="addDialog"
      v-model:title="taskDetails.title"
      v-model:description="taskDetails.description"
      v-model:notes="taskDetails.notes"
      v-model:dueDate="taskDetails.dueDate"
      v-model:priority="taskDetails.priority"
    ></TaskDialog>
    Task List
    <VSpacer />
    <VIcon @click="addDialog = true">mdi-plus</VIcon>
  </VToolbar>

  <VExpansionPanels>
    <VExpansionPanel>
      <VExpansionPanelTitle>{{ taskDetails.title }}</VExpansionPanelTitle>
      <VExpansionPanelText>{{ taskDetails.dueDate }}</VExpansionPanelText>
      <VExpansionPanelText>{{ taskDetails.description }}</VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TaskDialog from "@/components/TaskDialog.vue";
import { RegisterMutation } from "@/graphql/auth/register.graphql.ts";

const addDialog = ref(false);

const taskDetails = ref({
  title: "",
  description: "",
  notes: "",
  dueDate: "",
  priority: ""
});
</script>
