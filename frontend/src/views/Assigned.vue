<!--
Name: Jensen Stamp
Description: Assigned task page, shows the classes and tasks for a student
Details: Uses ConfirmationDialog
Date: 2/8/24
-->
<template>
  <VContainer>
    <!-- Large title -->
    <h1>Assigned</h1>
    <div v-if="!classes[0]" class="d-flex justify-center">
      <div
        class="d-flex w-100 flex-column justify-center align-center"
        style="color: #696969"
      >
        <h2>You have no Classes</h2>
        <p style="font-size: 15px">
          Tell your teacher your email so they can add you
        </p>
        <VIcon size="150px">mdi-close-circle-outline</VIcon>
      </div>
    </div>
    <div v-else v-for="item in classes" :key="item.id" class="pb-10">
      <VToolbar class="px-6 mb-4" style="border-radius: 4px">
        {{ item.name }}
      </VToolbar>
      <ConfirmationDialog
        @update:model-value="unsetIDs"
        @submit=""
        v-model="confirmation"
      ></ConfirmationDialog>
      <div v-if="!item.tasks[0]" class="d-flex justify-center">
        <div
          class="d-flex w-100 flex-column justify-center align-center"
          style="color: #696969"
        >
          <h2>You have no pending tasks</h2>
          <p>Ask your teacher to assign some</p>
          <VIcon size="150px" class="">mdi-close-circle-outline</VIcon>
        </div>
      </div>
      <VExpansionPanels>
        <!-- For loop to add tasks sorted by descending priority -->
        <VExpansionPanel
          v-for="task in item.tasks
            .concat()
            .sort((a, b) => b.priority - a.priority)"
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
          </VExpansionPanelTitle>
          <!-- Shows task details -->
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
            <p
              v-if="!task.notes"
              class="text-truncate mb-2"
              style="color: #9d9d9d"
            >
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
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
      <VDivider class="mt-10"></VDivider>
    </div>
  </VContainer>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getClasses } from "@/composables/getClasses.ts";
import { getTasks } from "@/composables/getTasks.ts";
import { Class, Task } from "@/gql/graphql.ts";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";

const classes = ref<Class[]>([]);
const tasks = ref<Task[]>([]);

// Dialog variable
const confirmation = ref(false);

const addingClasses = ref<number | undefined>(undefined);

// Id variables
const completedId = ref<number | undefined>(undefined);
const editingId = ref<number | undefined>(undefined);

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
  // Clears inputs and gets tasks
  classes.value = await getClasses();
  tasks.value = await getTasks();
});
</script>
