<!--
Name: Jensen Stamp
Description: UNFINISHED
Details: UNFINISHED
Date: 2/8/24
-->
<template>
  <VContainer>
    <!-- Large title -->
    <h1>Assigned</h1>
    <div v-if="!classes[0]" class="d-flex justify-center">
      <div class="d-flex w-100 flex-column justify-center align-center">
        <h2>You have no Classes</h2>
        <VIcon size="150px" class="">mdi-close-circle-outline</VIcon>
      </div>
    </div>
    <div v-else v-for="item in classes" :key="item.id" class="pb-10">
      <VToolbar class="px-6 mb-4">{{ item.name }}</VToolbar>
      <ConfirmationDialog
        @update:model-value="unsetIDs"
        @submit=""
        v-model="confirmation"
      >
        <!-- If completedId is defined the ConfirmationDialog shows text for completing a task  -->
        <template #title>Complete Task</template>
        <template #button>Confirm</template>
        <template #text>complete</template>
      </ConfirmationDialog>
      <div v-if="!item.tasks[0]" class="d-flex justify-center">
        <div class="d-flex w-100 flex-column justify-center align-center">
          <h2>You have no pending tasks</h2>
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
            <!-- Getting the task title for each task from -->
            {{ task.title }} • {{ new Date(task.dueDate).toLocaleString() }}
            <VSpacer />
            <VBtn
              v-if="userStore.user?.accountType === AccountType.User"
              @click.stop="
                completedId = task.id;
                confirmation = true;
              "
              variant="text"
              icon="mdi-check"
              color="green"
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
            <template
              v-if="userStore.user?.accountType === AccountType.Teacher"
            >
              <p class="font-weight-bold pb-2">Classes:</p>
              <VChipGroup>
                <VChip
                  @click="
                    addingClasses = task.id;
                    confirmation = true;
                  "
                >
                  <VIcon>mdi-plus</VIcon>
                </VChip>
                <VChip v-for="classItem in task.classes" :key="classItem.id">
                  {{ classItem.name }}
                </VChip>
              </VChipGroup>
            </template>
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
import { AccountType, Class, Task } from "@/gql/graphql.ts";
import { useUserStore } from "@/stores/user.ts";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";

const classes = ref<Class[]>([]);
const tasks = ref<Task[]>([]);
const userStore = useUserStore();

// Dialog variables
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
