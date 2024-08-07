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
    <ConfirmationDialog
      v-model="confirmation"
      @submit="updateTask"
    ></ConfirmationDialog>
    Task List
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
      <VExpansionPanelTitle>{{ item.name }}</VExpansionPanelTitle>
      <VExpansionPanelText>
        <p class="font-weight-bold pb-2">Students:</p>
        <VChipGroup>
          <VChip>
            <VIcon>mdi-plus</VIcon>
          </VChip>
          <VChip v-for="student in item.students" :key="student.id">
            {{ student.username }}
          </VChip>
        </VChipGroup>
        <p class="font-weight-bold pb-2">Tasks:</p>
        <VChipGroup>
          <VChip>
            <VIcon>mdi-plus</VIcon>
          </VChip>
          <VChip v-for="student in item.students" :key="student.id">
            {{ item.name }}
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
import { AccountType, Class } from "@/gql/graphql.ts";
import { getClasses } from "@/composables/getClasses.ts";
import { CLASS_USER_ASSOCIATION_MUTATION } from "@/graphql/class/classUserAssociation.ts";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import { useUserStore } from "@/stores/user.ts";

const addDialog = ref(false);
const className = ref("");
const students = ref([]);
const classes = ref<Class[]>([]);

const userStore = useUserStore();

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
  await addStudents(createClass.id);
  // Closes the dialog by setting addDialog to false
  addDialog.value = false;
  // Runs the getTasks function to retrieve the created task, and to display it
  classes.value = await getClasses();
}

async function addStudents(classId: number) {
  const apollo = useApolloClient();
  await apollo.client.mutate({
    mutation: CLASS_USER_ASSOCIATION_MUTATION,
    variables: {
      input: {
        emails: students.value!.map((student) => student.email),
        classId
      }
    }
  });
}

onMounted(async () => {
  // Clears inputs and gets tasks
  classes.value = await getClasses();
});
</script>
