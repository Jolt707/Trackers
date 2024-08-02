<!--
Name: Jensen Stamp
Description: This is the main component that handles task creation, deleting, editing and completing
Details: This component is used in Tasks.vue, however does not send any data to it
Date: 2/8/24
-->
<template>
  <VToolbar class="px-6 mb-4">
    <!--
    Using the TaskDialog component
    @taskAdd will either run editTask or createTask, depending on if there is an editingId
    addDialog model to show the TaskDialog component
    Setting the models from the component to the taskDetails variable
    -->
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
      <!-- If editingId is selected the TaskDialog title and button slot will display the text for an edit  -->
      <template v-if="!editingId" #title>Create Task</template>
      <template v-if="editingId" #title>Editing Task</template>
      <template v-if="!editingId" #button>continue</template>
      <template v-if="editingId" #button>confirm</template>
    </TaskDialog>
    <ConfirmationDialog @submit="updateTask" v-model="confirmation">
      <!-- If completedId is defined the ConfirmationDialog shows text for completing a task  -->
      <template v-if="!completedId" #title>Delete Task</template>
      <template v-if="completedId" #title>Complete Task</template>
      <template v-if="!completedId" #button>Delete</template>
      <template v-if="completedId" #button>Confirm</template>
      <template v-if="!completedId" #text>delete</template>
      <template v-if="completedId" #text>complete</template>
    </ConfirmationDialog>
    Task List
    <VSpacer />
    <!-- Shows the dialog, unsets editingId and clears previous inputs -->
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
    <!-- For loop to add tasks sorted by descending priority -->
    <VExpansionPanel
      v-for="task in tasks.concat().sort((a, b) => b.priority - a.priority)"
      :key="task.id"
    >
      <VExpansionPanelTitle>
        <!-- Getting the task title for each task from -->
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

// Dialog variables
const addDialog = ref(false);
const confirmation = ref(false);

// Id variables
const completedId = ref<number | undefined>(undefined);
const editingId = ref<number | undefined>(undefined);

// Variable to combine the date input and time input
const dateAndTime = computed(() => {
  if (!taskDetails.value.dueDate) return "";
  const date = dayjs(taskDetails.value.dueDate)
    // Separates and sets hours, minutes and seconds by the : in the timestamp
    .set("minute", parseInt(taskDetails.value.dueTime.split(":")[1]))
    .set("hour", parseInt(taskDetails.value.dueTime.split(":")[0]))
    .set("second", parseInt(taskDetails.value.dueTime.split(":")[2]));
  return date.toISOString();
});

// Defining the task details to put into the create or edit function
const taskDetails = ref({
  title: "",
  description: "",
  notes: "" as string | null | undefined,
  dueDate: new Date() as Date | undefined,
  dueTime: "00:00:00",
  priority: 0 as number | undefined
});

// Defining tasks array to display tasks
const tasks = ref<Task[]>([]);

// Create Task function, uses the taskDetails input to create a database table
async function createTask() {
  const apollo = useApolloClient();
  await apollo.client.mutate({
    mutation: CREATE_TASK_QUERY,
    variables: {
      input: {
        /*
        Input details for the function, sets dueTime to undefined and dueDate to the dateAndTime variable
        (This is done because originally there was no way to set a time, since the Vuetify datepicker doesn't have a time field)
        */
        ...taskDetails.value,
        dueTime: undefined,
        dueDate: dateAndTime.value
      }
    }
  });
  // Closes the dialog by setting addDialog to false
  addDialog.value = false;
  // Runs the getTasks function to retrieve the created task, and to display it
  tasks.value = await getTasks();
}

// Edit Task function, takes the updated taskDetails and editingId to update an existing task
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
  // Closes the dialog by setting addDialog to false
  addDialog.value = false;
  // Runs the getTasks function to retrieve the tasks, displaying the new one
  tasks.value = await getTasks();
}

// Update Task function to either delete or complete a selected task
async function updateTask() {
  const apollo = useApolloClient();
  // If there is no completedId, the task will be deleted
  if (!completedId) {
    await apollo.client.mutate({
      mutation: DELETE_TASK_QUERY,
      variables: {
        input: {
          taskId: editingId.value
        }
      }
    });
    // Unsets the editingId
    editingId.value = undefined;
    // Runs the getTasks function to retrieve the tasks, removing the deleted task
    tasks.value = await getTasks();
    // Closes the confirmation dialog
    confirmation.value = false;

    // When there is a completedId, the task will be set as complete
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
    // Unsets the completedId
    completedId.value = undefined;
    // Unsets the editingId
    editingId.value = undefined;
    // Runs the getTasks function to retrieve the tasks, removing the deleted task
    tasks.value = await getTasks();
    // Closes the confirmation dialog
    confirmation.value = false;
  }
}

const route = useRoute();

// Function that clears the inputs to avoid previous inputs from being shown when the dialog is opened
async function clearInputs() {
  taskDetails.value.title = "";
  taskDetails.value.description = "";
  taskDetails.value.notes = "";
  taskDetails.value.dueDate = undefined;
  taskDetails.value.priority = 0;
}

// When the page is mounted (loaded) all of this will be run if relevant
onMounted(async () => {
  // Clears inputs and gets tasks
  await clearInputs();
  tasks.value = await getTasks();

  // If the create query is in the route, the TaskDialog will open
  if (route.query.create) {
    addDialog.value = true;
  }

  // If the edit query is in the route, the TaskDialog will open, and set the taskDetails to display in the dialog
  if (route.query.edit) {
    // Gets the editingId from the query
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
