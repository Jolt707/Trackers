<!--
Name: Jensen Stamp
Description: This is the card item that displays tasks on the homepage
Details: The parent component is only the homepage
Date: 2/8/24
-->
<template>
  <VCard class="mt-6">
    <!-- Title sets to the task title -->
    <VCardTitle class="mb-4">{{ props.task.title }}</VCardTitle>
    <VCardText v-if="task.dueDate" class="text-truncate mt-n2">
      DUE: {{ new Date(task.dueDate).toLocaleString() }}
    </VCardText>
    <VCardText v-else class="text-truncate mt-n2" style="color: #9d9d9d">
      Unset due date
    </VCardText>
    <VCardText v-if="task.description" class="text-truncate mt-n4">
      {{ props.task.description }}
    </VCardText>
    <VCardText v-else class="text-truncate mt-n4" style="color: #9d9d9d">
      No description
    </VCardText>
    <VCardActions class="mt-n3">
      <!-- Runs the completeTask function and sets the completedId -->
      <VBtn
        v-if="userStore.user?.accountType === AccountType.User"
        color="green"
        @click.stop="
          completedId = task.id;
          completeTask();
        "
      >
        COMPLETE TASK
      </VBtn>
      <!-- Redirects to the tasks with the edit query -->
      <VBtn color="blue" :to="'/tasks?edit=' + task.id">EDIT TASK</VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
import { AccountType, Task } from "@/gql/graphql.ts";
import { ref } from "vue";
import { useApolloClient } from "@vue/apollo-composable";
import { COMPLETE_TASK_QUERY } from "@/graphql/task/completeTask.graphql.ts";
import { useUserStore } from "@/stores/user.ts";

const completedId = ref<number | undefined>(undefined);

// Function to complete the task by using a mutation to set completedTask to true
async function completeTask() {
  const apollo = useApolloClient();
  await apollo.client.mutate({
    mutation: COMPLETE_TASK_QUERY,
    variables: {
      input: {
        completedTask: true,
        taskId: completedId.value
      }
    }
  });
  emit("refresh");
}

// Defines a prop of task using the task details
const props = defineProps<{ task: Task }>();

// Defines a refresh emit that will run getTasks on the parent component
const emit = defineEmits(["refresh"]);

const userStore = useUserStore();
</script>
