<!--
Name: Jensen Stamp
Description: This is the ClassesList that shows on the classes page for teachers
Details: Uses the ClassesDialog and ConfirmationDialog
Date: 11/8/24
-->
<template>
  <VToolbar class="mb-4 pl-6" style="border-radius: 4px">
    <ClassesDialog
      v-model:students="students"
      v-model="addDialog"
      v-model:name="className"
      @classAdd="createClass"
    >
      <template #title>Create Class</template>
      <template #button>Continue</template>
    </ClassesDialog>
    <ConfirmationDialog v-model="confirmation" @submit="updateClass">
      <template #type>class</template>

      <!-- Slots for the addingStudents (when adding students to a class) -->
      <template v-if="addingStudents" #title>Add Students</template>
      <template v-if="addingStudents" #text>add students to</template>
      <template v-if="addingStudents" #button>Add</template>
      <template v-if="addingStudents" #options>
        <div class="d-flex">
          <!-- TextField for the email -->
          <VTextField
            autofocus
            v-model="student"
            label="Student Email"
            @keydown.enter="addStudent"
          ></VTextField>
          <VIcon @click="addStudent" class="mt-3">mdi-plus</VIcon>
        </div>
        <VDataTable
          v-if="addedStudents![0]"
          :headers="tableHeader"
          :items="addedStudents"
        >
          <template #item.actions="{ item }">
            <VBtn
              variant="text"
              icon="mdi-close"
              @click="removeStudent(item.email)"
            ></VBtn>
          </template>
        </VDataTable>
      </template>

      <!-- Slots for the addingTasks (when adding tasks to a class) -->
      <template v-if="addingTasks" #title>Add Tasks</template>
      <template v-if="addingTasks" #text>add tasks to</template>
      <template v-if="addingTasks" #button>Add</template>
      <template v-if="addingTasks" #options>
        <!-- Autocomplete for the tasks -->

        <VAutocomplete
          multiple
          chips
          label="Tasks"
          :items="tasks"
          item-value="id"
          item-title="title"
          v-model="addTasks"
          addTask="addTask"
        ></VAutocomplete>
      </template>

      <!-- Slots for the destroyId (when deleting a class) -->
      <template v-if="destroyId" #title>Delete Class</template>
      <template v-if="destroyId" #text>delete</template>
      <template v-if="destroyId" #button style>Delete</template>

      <!-- Slots for the destroyId (when renaming a class) -->
      <template v-if="editingId" #title>Edit Class</template>
      <template v-if="editingId" #text>edit</template>
      <template v-if="editingId" #button>Confirm</template>
      <template v-if="editingId" #options>
        <!-- TextField for the updated name -->
        <VTextField label="Name" autofocus v-model="updateName"></VTextField>
      </template>
    </ConfirmationDialog>
    Classes List
    <VSpacer />
    <!-- Only shows a plus if the account is a teacher -->
    <VBtn
      variant="tonal"
      class="mr-3"
      icon="mdi-plus"
      color="#ffd707"
      v-if="userStore.user?.accountType === AccountType.Teacher"
      @click="
        addDialog = true;
        addedStudents = [];
      "
    ></VBtn>
  </VToolbar>
  <div v-if="!classes[0]" class="d-flex justify-center">
    <div
      class="d-flex w-100 flex-column justify-center align-center"
      style="color: #696969"
    >
      <h2>You have no created classes</h2>
      <p>
        Use the
        <VIcon class="mb-1" color="gold">mdi-plus</VIcon>
        icon to create a class
      </p>
      <VIcon size="150px" style="color: #696969">
        mdi-close-circle-outline
      </VIcon>
    </div>
  </div>
  <VExpansionPanels>
    <!-- Shows each class with a for loop with a key of the id -->
    <VExpansionPanel v-for="item in classes" :key="item.id">
      <VExpansionPanelTitle>
        {{ item.name }}
        <VSpacer />
        <!-- Button for editing classes, unsets other selector variables -->
        <VBtn
          v-if="userStore.user?.accountType === AccountType.Teacher"
          @click.stop="
            addingTasks = undefined;
            addingStudents = undefined;
            destroyId = undefined;
            confirmation = true;
            editingId = item.id;
          "
          class="mr-3"
          variant="tonal"
          icon="mdi-pencil"
          color="#0190ea"
        ></VBtn>
        <!-- Button for deleting classes, unsets other selector variables -->
        <VBtn
          v-if="userStore.user?.accountType === AccountType.Teacher"
          @click.stop="
            addingTasks = undefined;
            addingStudents = undefined;
            editingId = undefined;
            confirmation = true;
            destroyId = item.id;
          "
          class="mr-5"
          variant="tonal"
          icon="mdi-delete"
          color="red"
        ></VBtn>
      </VExpansionPanelTitle>
      <VExpansionPanelText>
        <p class="font-weight-bold">Students:</p>
        <VChipGroup class="pb-4">
          <!-- Button for adding students to the class, unsets other selector variables -->
          <VChip
            v-if="userStore.user?.accountType === AccountType.Teacher"
            @click="
              addedStudents = [];
              addingTasks = undefined;
              destroyId = undefined;
              editingId = undefined;
              confirmation = true;
              addingStudents = item.id;
            "
          >
            <VIcon>mdi-plus</VIcon>
          </VChip>
          <!-- For loop to show the students in the class -->
          <VChip v-for="student in item.students" :key="student.id">
            {{ student.username }} • {{ student.email }}
            <VBtn
              variant="text"
              icon="mdi-close"
              class="ml-2"
              size="20px"
              @click="
                addedStudents = [];
                classId = item.id;
                addedStudents.push({ email: student.email });
                addStudents(classId, addedStudents);
              "
            ></VBtn>
          </VChip>
        </VChipGroup>
        <p class="font-weight-bold">Active Tasks:</p>
        <VChipGroup>
          <!-- Button for adding tasks to the class, unsets other selector variables -->
          <VChip
            v-if="userStore.user?.accountType === AccountType.Teacher"
            @click="
              addingStudents = undefined;
              destroyId = undefined;
              editingId = undefined;
              confirmation = true;
              addTasks = item.tasks.map((task) => task.id);
              addingTasks = item.id;
            "
          >
            <VIcon>mdi-plus</VIcon>
          </VChip>
          <!-- For loop to show the tasks in the class -->
          <VChip v-for="taskItem in item.tasks" :key="taskItem.id">
            {{ taskItem.title }}
            <VBtn
              variant="text"
              icon="mdi-close"
              class="ml-2"
              size="20px"
              @click="
                addTasks = [];
                classId = item.id;
                addTasks.push(taskItem.id);
                addTasksFunction(classId);
              "
            ></VBtn>
          </VChip>
        </VChipGroup>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import ClassesDialog from "@/components/ClassesDialog.vue";
import { useApolloClient } from "@vue/apollo-composable";
import { CREATE_CLASS_QUERY } from "@/graphql/class/createClass.graphql.ts";
import { AccountType, Class, Task } from "@/gql/graphql.ts";
import { getClasses } from "@/composables/getClasses.ts";
import { CLASS_USER_ASSOCIATION_MUTATION } from "@/graphql/class/classUserAssociation.ts";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import { useUserStore } from "@/stores/user.ts";
import { getTasks } from "@/composables/getTasks.ts";
import { DELETE_CLASS_QUERY } from "@/graphql/class/deleteClass.graphql.ts";
import { UPDATE_CLASS_QUERY } from "@/graphql/class/updateClass.graphql.ts";
import { CLASS_TASK_ASSOCIATION_MUTATION } from "@/graphql/task/classTaskAssociation.graphql.ts";

// Defines a lot of variables for opening dialogs, selecting IDs, adding students, etc
const addDialog = ref(false);
const className = ref("");
const students = ref([]);
const classes = ref<Class[]>([]);
const tasks = ref<Task[]>([]);
const confirmation = ref(false);
const addingTasks = ref<number | undefined>(undefined);
const addingStudents = ref<number | undefined>(undefined);
const destroyId = ref<number | undefined>(undefined);
const editingId = ref<number | undefined>(undefined);
const updateName = defineModel("updateName");
const student = ref("");
const addedStudents = ref<{ email: string }[]>([]);
const tableHeader = [
  { key: "email", title: "Email" },
  { key: "actions", title: "Remove" }
];
const addTasks = ref<number[]>([]);
const userStore = useUserStore();

// Add tasks function to add multiple tasks to a class with the input of addTasks
async function addTasksFunction(classId: number) {
  const apollo = useApolloClient();
  await apollo.client.mutate({
    mutation: CLASS_TASK_ASSOCIATION_MUTATION,
    variables: {
      input: {
        taskId: addTasks.value,
        classId
      }
    }
  });
  classes.value = await getClasses();
}

// Creates a class using the name input from className.value
async function createClass() {
  const apollo = useApolloClient();
  const {
    data: { createClass }
  } = await apollo.client.mutate({
    mutation: CREATE_CLASS_QUERY,
    variables: {
      input: {
        name: className.value
      }
    }
  });
  // Runs addStudents to associate the students to the created task
  await addStudents(createClass.id, students.value);
  // Closes the dialog by setting addDialog to false
  addDialog.value = false;
  // Runs the getClasses function to retrieve the created class, and to display it
  classes.value = await getClasses();
}

// Update class function for deleting, adding and editing a task
async function updateClass() {
  const apollo = useApolloClient();
  // If the destroyId is selected, class is deleted
  if (destroyId.value) {
    await apollo.client.mutate({
      mutation: DELETE_CLASS_QUERY,
      variables: {
        input: {
          classId: destroyId.value
        }
      }
    });
    // If the editingId is selected, the class gets its named updated
  } else if (editingId.value) {
    await apollo.client.mutate({
      mutation: UPDATE_CLASS_QUERY,
      variables: {
        input: {
          classId: editingId.value,
          name: updateName.value
        }
      }
    });
    // If addingStudents is selected, the addStudents function is called
  } else if (addingStudents.value) {
    await addStudents(addingStudents.value, addedStudents.value);
    // If addingTasks is selected, the addTasksFunction is called
  } else if (addingTasks.value) {
    await addTasksFunction(addingTasks.value);
  }
  classes.value = await getClasses();
  // Closes the confirmation dialog
  confirmation.value = false;
  destroyId.value = undefined;
}

// addStudent function that adds the students to the table
async function addStudent() {
  if (addedStudents.value!.find((s) => s.email === student.value)) {
    return;
  }
  addedStudents.value!.push({
    email: student.value
  });
  student.value = "";
}

// Associates students with the class
async function addStudents(classId: number, students: { email: string }[]) {
  const apollo = useApolloClient();
  await apollo.client.mutate({
    mutation: CLASS_USER_ASSOCIATION_MUTATION,
    variables: {
      input: {
        emails: students.map((student) => student.email),
        classId
      }
    }
  });
  classes.value = await getClasses();
}

function removeStudent(email: string) {
  addedStudents.value = addedStudents.value!.filter(
    (student) => student.email !== email
  );
}

// Runs on page load
onMounted(async () => {
  // Clears gets tasks and classes
  classes.value = await getClasses();
  tasks.value = await getTasks();
});
</script>
