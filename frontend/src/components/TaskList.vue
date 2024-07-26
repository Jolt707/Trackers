<template>
  <VToolbar class="px-6 mb-4">
    <TaskDialog
      @taskAdd="editingId ? editTask() : createTask()"
      v-model="addDialog"
      v-model:title="taskDetails.title"
      v-model:description="taskDetails.description"
      v-model:notes="taskDetails.notes"
      v-model:dueDate="taskDetails.dueDate"
      v-model:dueTime="taskDetails.dueTime"
      v-model:priority="taskDetails.priority"
    >
      <template v-if="!editingId" #title>Create Task</template>
      <template v-if="editingId" #title>Editing Task</template>
      <template v-if="!editingId" #button>continue</template>
      <template v-if="editingId" #button>confirm</template>
    </TaskDialog>
    <ConfirmationDialog @submit="deleteTask" v-model="confirmation">
      <template v-if="!completedId" #title>Delete Task</template>
      <template v-if="completedId" #title>Complete Task</template>
      <template v-if="!completedId" #button>Delete</template>
      <template v-if="completedId" #button>Confirm</template>
      <template v-if="!completedId" #text>delete</template>
      <template v-if="completedId" #text>complete</template>
    </ConfirmationDialog>
    Task List
    <VSpacer />
    <VIcon
      @click="
        addDialog = true;
        editingId = undefined;
        clearInputs();
      "
    >
      mdi-plus
    </VIcon>
  </VToolbar>

  <VExpansionPanels>
    <VExpansionPanel
      v-for="task in tasks.concat().sort((a, b) => b.priority - a.priority)"
      :key="task.id"
    >
      <VExpansionPanelTitle>
        {{ task.title }} • {{ new Date(task.dueDate).toLocaleString() }}
        <VSpacer />
        <VBtn
          @click.stop="
            completedId = task.id;
            confirmation = true;
          "
          variant="text"
          icon="mdi-check"
          color="green"
        ></VBtn>
        <VBtn
          @click.stop="
            editingId = task.id;
            addDialog = true;
            taskDetails.title = task.title;
            taskDetails.description = task.description;
            taskDetails.notes = task.notes;
            taskDetails.dueDate = new Date(task.dueDate);
            taskDetails.priority = task.priority;
          "
          variant="text"
          icon="mdi-pencil"
          color="#0190ea"
        ></VBtn>
        <VBtn
          @click.stop="
            editingId = task.id;
            completedId = undefined;
            confirmation = true;
          "
          class="mr-2"
          variant="text"
          icon="mdi-delete"
          color="red"
        ></VBtn>
      </VExpansionPanelTitle>
      <VExpansionPanelText>
        <p class="font-weight-bold pb-2">Description:</p>
        <p class="text-truncate pb-2">
          {{ task.description }}
        </p>
        <p class="font-weight-bold pb-2">Notes:</p>
        <p class="text-truncate pb-2">{{ task.notes }}</p>
        <p class="font-weight-bold">Priority:</p>
        <p class="pb-2" style="font-size: 15px">Higher = Prioritised</p>
        <p class="text-truncate pb-2">{{ task.priority }}</p>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import TaskDialog from "@/components/TaskDialog.vue";
import { useApolloClient } from "@vue/apollo-composable";
import { CREATE_TASK_QUERY } from "@/graphql/task/createTask.graphql.ts";
import { Task } from "@/gql/graphql.ts";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import { getTasks } from "@/composables/getTasks.ts";
import { DELETE_TASK_QUERY } from "@/graphql/task/deleteTask.graphql.ts";
import { UPDATE_TASK_QUERY } from "@/graphql/task/updateTask.graphql.ts";
import { COMPLETE_TASK_QUERY } from "@/graphql/task/completeTask.graphql.ts";
import { useRoute } from "vue-router";
import dayjs from "dayjs";

const addDialog = ref(false);

const confirmation = ref(false);

const completedId = ref<number | undefined>(undefined);

const editingId = ref<number | undefined>(undefined);

const dateAndTime = computed(() => {
  console.log(taskDetails.value.dueTime);
  if (!taskDetails.value.dueDate) return "";
  const date = dayjs(taskDetails.value.dueDate)
    .set("minute", parseInt(taskDetails.value.dueTime.split(":")[1]))
    .set("hour", parseInt(taskDetails.value.dueTime.split(":")[0]))
    .set("second", parseInt(taskDetails.value.dueTime.split(":")[2]));
  return date.toISOString();
});

const taskDetails = ref({
  title: "",
  description: "",
  notes: "" as string | null | undefined,
  dueDate: new Date() as Date | undefined,
  dueTime: "00:00:00",
  priority: 0 as number | undefined
});

const tasks = ref<Task[]>([]);

async function createTask() {
  const apollo = useApolloClient();
  await apollo.client.mutate({
    mutation: CREATE_TASK_QUERY,
    variables: {
      input: {
        ...taskDetails.value,
        dueTime: undefined,
        dueDate: dateAndTime.value
      }
    }
  });
  addDialog.value = false;
  tasks.value = await getTasks();
}

async function editTask() {
  const apollo = useApolloClient();
  await apollo.client.mutate({
    mutation: UPDATE_TASK_QUERY,
    variables: {
      input: {
        ...taskDetails.value,
        taskId: editingId.value
      }
    }
  });
  addDialog.value = false;
  tasks.value = await getTasks();
}

async function deleteTask() {
  const apollo = useApolloClient();
  if (!completedId) {
    await apollo.client.mutate({
      mutation: DELETE_TASK_QUERY,
      variables: {
        input: {
          taskId: editingId.value
        }
      }
    });
    editingId.value = undefined;
    tasks.value = await getTasks();
    confirmation.value = false;
  } else {
    await apollo.client.mutate({
      mutation: COMPLETE_TASK_QUERY,
      variables: {
        input: {
          completedTask: true,
          taskId: completedId.value
        }
      }
    });
    editingId.value = undefined;
    tasks.value = await getTasks();
    confirmation.value = false;
  }
}

const route = useRoute();

async function clearInputs() {
  taskDetails.value.title = "";
  taskDetails.value.description = "";
  taskDetails.value.notes = "";
  taskDetails.value.dueDate = undefined;
  taskDetails.value.priority = 0;
}

onMounted(async () => {
  await clearInputs();
  tasks.value = await getTasks();
  if (route.query.create) {
    addDialog.value = true;
  }
  if (route.query.edit) {
    editingId.value = parseInt(<string>route.query.edit);
    const task = tasks.value.find((task) => task.id === editingId.value);
    if (!task) {
      return;
    }
    addDialog.value = true;
    taskDetails.value.title = task.title;
    taskDetails.value.description = task.description;
    taskDetails.value.notes = task.notes;
    taskDetails.value.dueDate = new Date(task.dueDate);
    taskDetails.value.priority = task.priority;
  }
});
</script>
