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

    Task List
    <VSpacer />
    <VIcon @click="addDialog = true">mdi-plus</VIcon>
  </VToolbar>
  <VExpansionPanels>
    <VExpansionPanel v-for="item in classes" :key="item.id">
      <VExpansionPanelTitle>{{ item.name }}</VExpansionPanelTitle>
      <VExpansionPanelText>
        <div v-for="student in item.students" :key="student.id">
          {{ student.username }}
        </div>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import SpeciesDialog from "@/components/SpeciesDialog.vue";
import { useApolloClient } from "@vue/apollo-composable";
import { CREATE_CLASS_QUERY } from "@/graphql/class/createClass.graphql.ts";
import { Class } from "@/gql/graphql.ts";
import { getClasses } from "@/composables/getClasses.ts";
import { CLASS_USER_ASSOCIATION_MUTATION } from "@/graphql/class/classUserAssociation.ts";

const addDialog = ref(false);
const className = ref("");
const students = ref([]);
const classes = ref<Class[]>([]);

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
  apollo.client.mutate({
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
