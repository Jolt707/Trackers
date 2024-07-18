<template>
  <VToolbar class="px-6">
    <TaskDialog
      @taskAdd="createTask"
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
    <VExpansionPanel v-for="task in tasks" :key="task.id">
      <VExpansionPanelTitle>{{ task.title }}</VExpansionPanelTitle>
      <VExpansionPanelText>
        {{ task.dueDate }}
      </VExpansionPanelText>
      <VExpansionPanelText>{{ task.description }}</VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import TaskDialog from "@/components/TaskDialog.vue";
import { useApolloClient } from "@vue/apollo-composable";
import { CREATE_TASK_QUERY } from "@/graphql/task/createTask.graphql.ts";
import { GET_TASKS_QUERY } from "@/graphql/task/getTasks.graphql.ts";
import { Task } from "@/gql/graphql.ts";

const addDialog = ref(false);

const taskDetails = ref({
  title: "",
  description: "",
  notes: "",
  dueDate: new Date(),
  priority: ""
});

const tasks = ref<Task[]>([]);

async function createTask() {
  const apollo = useApolloClient();
  await apollo.client.mutate({
    mutation: CREATE_TASK_QUERY,
    variables: {
      input: {
        ...taskDetails.value,
        priority: parseInt(taskDetails.value.priority)
      }
    }
  });
  addDialog.value = false;
}

async function getTasks() {
  const apollo = useApolloClient();
  const {
    data: { tasks: tasksList }
  } = await apollo.client.query({
    query: GET_TASKS_QUERY
  });
  tasks.value = tasksList;
}
onMounted(() => {
  getTasks();
});
</script>
