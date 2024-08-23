<!--
Name: Jensen Stamp
Description: This is the main component that handles task creation, deleting, editing and completing
Details: This component is used in Tasks.vue, however does not send any data to it
Date: 2/8/24
-->
<template>
  <VToolbar class="mb-4 pl-6" style="border-radius: 4px">
    <!--
    Using the TaskDialog component
    @taskAdd will either run editTask or createTask, depending on if there is an editingId
    addDialog model to show the TaskDialog component
    Setting the models from the component to the taskDetails variable
    -->
    <TaskDialog
      v-model:addClasses="addClasses"
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

      <template
        v-if="userStore.user?.accountType === AccountType.Teacher && !editingId"
        #options
      >
        <VAutocomplete
          multiple
          chips
          label="Classes"
          :items="classes"
          item-value="id"
          item-title="name"
          v-model="addClasses"
        ></VAutocomplete>
      </template>
    </TaskDialog>
    <ConfirmationDialog
      @update:model-value="unsetIDs"
      @submit="updateTask"
      v-model="confirmation"
    >
      <template #type>task</template>

      <!-- If completedId is defined the ConfirmationDialog shows text for completing a task  -->
      <template v-if="!completedId" #title>Delete Task</template>
      <template v-if="completedId" #title>Complete Task</template>
      <template v-if="!completedId" #button>Delete</template>
      <template v-if="completedId" #button>Confirm</template>
      <template v-if="!completedId" #text>delete</template>
      <template v-if="completedId" #text>complete</template>

      <template v-if="addingClasses" #title>Add Classes</template>
      <template v-if="addingClasses" #text>add classes to</template>
      <template v-if="addingClasses" #button>Add</template>
      <template
        v-if="
          userStore.user?.accountType === AccountType.Teacher && addingClasses
        "
        #options
      >
        <VAutocomplete
          multiple
          chips
          label="Classes"
          :items="classes"
          item-value="id"
          item-title="name"
          v-model="addClasses"
        ></VAutocomplete>
      </template>
    </ConfirmationDialog>

    Task List
    <VSpacer />
    <!-- Shows the dialog, unsets editingId and clears previous inputs -->
    <VBtn
      class="mr-3"
      @click="
        addDialog = true;
        editingId = undefined;
        clearInputs();
      "
      variant="tonal"
      icon="mdi-plus"
      color="#ffd707"
    ></VBtn>
  </VToolbar>
  <div v-if="!tasks[0]" class="d-flex justify-center">
    <div
      class="d-flex w-100 flex-column justify-center align-center"
      style="color: #696969"
    >
      <h2>You have no pending tasks</h2>
      <p>
        Use the
        <VIcon class="mb-1" color="gold">mdi-plus</VIcon>
        icon to create a task
      </p>

      <VIcon size="150px" style="color: #696969">
        mdi-close-circle-outline
      </VIcon>
    </div>
  </div>
  <VExpansionPanels>
    <!-- For loop to add tasks sorted by descending priority -->
    <VExpansionPanel
      v-for="task in tasks.concat().sort((a, b) => b.priority - a.priority)"
      :key="task.id"
    >
      <VExpansionPanelTitle>
        <!-- Getting the task title and dueDate, displaying both if there is a dueDate-->
        <div v-if="task.dueDate">
          {{ task.title }} • {{ new Date(task.dueDate).toLocaleString() }}
        </div>
        <div v-else>
          {{ task.title }} •
          <span style="color: #9d9d9d">Unset Due Date</span>
        </div>
        <VSpacer />
        <!-- Button to complete tasks for a student (unfinished functionality for teachers -->
        <VBtn
          v-if="userStore.user?.accountType === AccountType.User"
          @click.stop="
            completedId = task.id;
            confirmation = true;
          "
          class="mr-3"
          variant="tonal"
          icon="mdi-check"
          color="green"
        ></VBtn>
        <!-- Button to edit a task -->
        <VBtn
          @click.stop="
            editingId = task.id;
            addDialog = true;
            taskDetails.title = task.title;
            taskDetails.description = task.description;
            taskDetails.notes = task.notes;
            taskDetails.dueDate = task.dueDate ? new Date(task.dueDate) : null;
            taskDetails.priority = task.priority;
          "
          class="mr-3"
          variant="tonal"
          icon="mdi-pencil"
          color="#0190ea"
        ></VBtn>
        <!-- Button to delete a task -->
        <VBtn
          @click.stop="
            destroyId = task.id;
            completedId = undefined;
            confirmation = true;
          "
          class="mr-5"
          variant="tonal"
          icon="mdi-delete"
          color="red"
        ></VBtn>
      </VExpansionPanelTitle>
      <!-- Showing task details -->
      <VExpansionPanelText>
        <p class="font-weight-bold mb-2">Description:</p>
        <p
          v-if="!task.description"
          class="text-truncate mb-2"
          style="color: #9d9d9d"
        >
          No description
        </p>
        <p v-else class="text-truncate mb-2">
          {{ task.description }}
        </p>

        <p class="font-weight-bold mb-2">Notes:</p>
        <p v-if="!task.notes" class="text-truncate mb-2" style="color: #9d9d9d">
          No notes
        </p>
        <p v-else class="text-truncate mb-2">{{ task.notes }}</p>
        <p class="font-weight-bold mb-2">Priority:</p>
        <p
          v-if="task.priority == 0"
          class="text-truncate"
          style="color: #9d9d9d"
        >
          {{ task.priority }}
        </p>
        <p v-else class="text-truncate">{{ task.priority }}</p>
        <p style="font-size: 12px; color: #9d9d9d">Higher = Prioritised</p>
        <!-- Shows the classes associated with the logged in teachers tasks -->
        <template v-if="userStore.user?.accountType === AccountType.Teacher">
          <p class="font-weight-bold mt-2">Classes:</p>
          <VChipGroup>
            <VChip
              @click="
                addClasses = task.classes.map((c) => c.id);
                addingClasses = task.id;
                confirmation = true;
              "
            >
              <VIcon>mdi-plus</VIcon>
            </VChip>
            <!-- Displays the classes associated with the task-->
            <VChip v-for="classItem in task.classes" :key="classItem.id">
              {{ classItem.name }}
              <VBtn
                variant="text"
                icon="mdi-close"
                class="ml-2"
                size="20px"
                @click="
                  addClasses = [];
                  taskId = task.id;
                  addClasses.push(classItem.id);
                  addClassesFunction(taskId);
                "
              ></VBtn>
            </VChip>
          </VChipGroup>
        </template>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import TaskDialog from "@/components/TaskDialog.vue";
import { useApolloClient } from "@vue/apollo-composable";
import { CREATE_TASK_QUERY } from "@/graphql/task/createTask.graphql.ts";
import { AccountType, Task } from "@/gql/graphql.ts";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import { getTasks } from "@/composables/getTasks.ts";
import { DELETE_TASK_QUERY } from "@/graphql/task/deleteTask.graphql.ts";
import { UPDATE_TASK_QUERY } from "@/graphql/task/updateTask.graphql.ts";
import { COMPLETE_TASK_QUERY } from "@/graphql/task/completeTask.graphql.ts";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import { TASK_CLASS_ASSOCIATION_MUTATION } from "@/graphql/task/taskClassAssociation.graphql.ts";
import { getClasses } from "@/composables/getClasses.ts";
import { useUserStore } from "@/stores/user.ts";

// Dialog variables
const addDialog = ref(false);
const confirmation = ref(false);

const addingClasses = ref<number | undefined>(undefined);

// Id variables
const completedId = ref<number | undefined>(undefined);
const editingId = ref<number | undefined>(undefined);
const destroyId = ref<number | undefined>(undefined);

const addClasses = ref<number[]>([]);
const classes = ref([]);

const userStore = useUserStore();

// Variable to combine the date input and time input
const dateAndTime = computed(() => {
  console.log(taskDetails.value.dueTime);
  if (!taskDetails.value.dueDate) return undefined;
  const date = dayjs(taskDetails.value.dueDate)
    // Separates and sets hours, minutes and seconds by the : in the timestamp
    .set("minute", parseInt(taskDetails.value.dueTime.split(":")[1]))
    .set("hour", parseInt(taskDetails.value.dueTime.split(":")[0]));
  return date.toISOString();
});

// Defining the task details to put into the create or edit function
const taskDetails = ref({
  title: "",
  description: "",
  notes: "" as string | null | undefined,
  dueDate: new Date() as Date | undefined,
  dueTime: "00:00",
  priority: 0 as number | undefined
});

// Defining tasks array to display tasks
const tasks = ref<Task[]>([]);

// Create Task function, uses the taskDetails input to create a database table
async function createTask() {
  const apollo = useApolloClient();
  const {
    data: { createTask }
  } = await apollo.client.mutate({
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
  if (userStore.user?.accountType === AccountType.Teacher) {
    await addClassesFunction(createTask.id);
  }
  // Closes the dialog by setting addDialog to false
  addDialog.value = false;
  // Runs the getTasks function to retrieve the created task, and to display it
  tasks.value = await getTasks();
}

// Adds classes to the task
async function addClassesFunction(taskId: number) {
  const apollo = useApolloClient();
  await apollo.client.mutate({
    mutation: TASK_CLASS_ASSOCIATION_MUTATION,
    variables: {
      input: {
        classId: addClasses.value,
        taskId
      }
    }
  });
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
        taskId: editingId.value,
        dueTime: undefined,
        dueDate: dateAndTime.value
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
  if (destroyId.value) {
    await apollo.client.mutate({
      mutation: DELETE_TASK_QUERY,
      variables: {
        input: {
          taskId: destroyId.value
        }
      }
    });

    // When there is a completedId, the task will be set as complete
  } else if (completedId.value) {
    await apollo.client.mutate({
      mutation: COMPLETE_TASK_QUERY,
      variables: {
        input: {
          completedTask: true,
          taskId: completedId.value
        }
      }
    });
    // Runs the getTasks function to retrieve the tasks, removing the deleted task
    // Closes the confirmation dialog
  } else if (addingClasses.value) {
    await addClassesFunction(addingClasses.value);
  }
  unsetIDs(false);
  tasks.value = await getTasks();
  confirmation.value = false;
}

// Defining route, which is used for the route query to open the dialogs from the homepage
const route = useRoute();

// Function that clears the inputs to avoid previous inputs from being shown when the dialog is opened
async function clearInputs() {
  taskDetails.value.title = "";
  taskDetails.value.description = "";
  taskDetails.value.notes = "";
  taskDetails.value.dueDate = undefined;
  taskDetails.value.dueTime = "00:00";
  taskDetails.value.priority = 0;
}

function unsetIDs(value: boolean) {
  if (value) {
    return;
  }
  completedId.value = undefined;
  editingId.value = undefined;
  addingClasses.value = undefined;
}

// When the page is mounted (loaded) all of this will be run if relevant
onMounted(async () => {
  // Clears inputs and gets tasks/classes
  await clearInputs();
  tasks.value = await getTasks();
  classes.value = await getClasses();

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
