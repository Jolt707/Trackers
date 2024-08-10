<template>
  <VToolbar class="px-6 mb-4">
    <SpeciesDialog
      v-model:students="students"
      v-model="addDialog"
      v-model:name="className"
      @classAdd="createClass"
    >
      <template #title>Create Class</template>
      <template #button>Confirm</template>
    </SpeciesDialog>
    <ConfirmationDialog v-model="confirmation" @submit="updateClass">
      <template #type>class</template>

      <template v-if="addingStudents" #title>Add Students</template>
      <template v-if="addingStudents" #text>add students to</template>
      <template v-if="addingStudents" #button>Add</template>
      <template v-if="addingStudents" #options>
        <div class="d-flex">
          <VTextField
            v-model="student"
            label="Student Email"
            @keydown.enter="addStudent"
          ></VTextField>
          <VIcon @click="addStudent" class="mt-3">mdi-plus</VIcon>
        </div>
        <VDataTable :headers="tableHeader" :items="addedStudents"></VDataTable>
      </template>

      <template v-if="addingTasks" #title>Add Tasks</template>
      <template v-if="addingTasks" #text>add tasks to</template>
      <template v-if="addingTasks" #button>Add</template>
      <template v-if="addingTasks" #options>
        <VAutocomplete
          multiple
          chips
          label="Tasks"
          :items="tasks"
          item-value="id"
          item-title="title"
          v-model="addTasks"
        ></VAutocomplete>
      </template>

      <template v-if="destroyId" #title>Delete Class</template>
      <template v-if="destroyId" #text>delete</template>
      <template v-if="destroyId" #button>Delete</template>

      <template v-if="editingId" #title>Edit Class</template>
      <template v-if="editingId" #text>edit</template>
      <template v-if="editingId" #button>Confirm</template>
      <template v-if="editingId" #options>
        <VTextField label="Name" autofocus v-model="updateName"></VTextField>
      </template>
    </ConfirmationDialog>
    Classes List
    <VSpacer />
    <VIcon
      v-if="userStore.user?.accountType === AccountType.Teacher"
      @click="addDialog = true"
    >
      mdi-plus
    </VIcon>
  </VToolbar>
  <VExpansionPanels>
    <VExpansionPanel v-for="item in classes" :key="item.id">
      <VExpansionPanelTitle>
        {{ item.name }}
        <VSpacer />
        <VBtn
          @click.stop="
            addingTasks = undefined;
            addingStudents = undefined;
            destroyId = undefined;
            confirmation = true;
            editingId = item.id;
          "
          variant="text"
          icon="mdi-pencil"
          color="#0190ea"
        ></VBtn>
        <VBtn
          @click.stop="
            addingTasks = undefined;
            addingStudents = undefined;
            editingId = undefined;
            confirmation = true;
            destroyId = item.id;
          "
          class="mr-2"
          variant="text"
          icon="mdi-delete"
          color="red"
        ></VBtn>
      </VExpansionPanelTitle>
      <VExpansionPanelText>
        <p class="font-weight-bold pb-2">Students:</p>
        <VChipGroup>
          <VChip
            @click="
              addingTasks = undefined;
              destroyId = undefined;
              editingId = undefined;
              confirmation = true;
              addingStudents = item.id;
            "
          >
            <VIcon>mdi-plus</VIcon>
          </VChip>
          <VChip v-for="student in item.students" :key="student.id">
            {{ student.username }}
          </VChip>
        </VChipGroup>
        <p class="font-weight-bold pb-2">Active Tasks:</p>
        <VChipGroup>
          <VChip
            @click="
              addingStudents = undefined;
              destroyId = undefined;
              editingId = undefined;
              confirmation = true;
              addingTasks = item.id;
            "
          >
            <VIcon>mdi-plus</VIcon>
          </VChip>
          <VChip v-for="taskItem in item.tasks" :key="taskItem.id">
            {{ taskItem.title }}
          </VChip>
        </VChipGroup>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import SpeciesDialog from "@/components/SpeciesDialog.vue";
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
const tableHeader = [{ key: "email", title: "Email" }];
const addTasks = ref<number[]>([]);

const userStore = useUserStore();

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
}

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
  await addStudents(createClass.id, students.value);
  // Closes the dialog by setting addDialog to false
  addDialog.value = false;
  // Runs the getTasks function to retrieve the created task, and to display it
  classes.value = await getClasses();
}

async function updateClass() {
  const apollo = useApolloClient();
  if (destroyId.value) {
    await apollo.client.mutate({
      mutation: DELETE_CLASS_QUERY,
      variables: {
        input: {
          classId: destroyId.value
        }
      }
    });
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
  } else if (addingStudents.value) {
    await addStudents(addingStudents.value, addedStudents.value);
  } else if (addingTasks.value) {
    console.log(addingTasks.value);
    await addTasksFunction(addingTasks.value);
  }
  classes.value = await getClasses();
  // Closes the confirmation dialog
  confirmation.value = false;
  destroyId.value = undefined;
}

async function addStudent() {
  if (addedStudents.value!.find((s) => s.email === student.value)) {
    return;
  }
  addedStudents.value!.push({
    email: student.value
  });
}

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
}

onMounted(async () => {
  // Clears inputs and gets tasks
  classes.value = await getClasses();
  tasks.value = await getTasks();
});
</script>
