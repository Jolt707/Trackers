<!--
Name: Jensen Stamp
Description: This is the card item that displays tasks on the homepage
Details: The parent component is only the homepage
Date: 2/8/24
-->
<!-- TODO: FIX THE DATE STUFF ON THIS COMPONENT -->
<template>
  <VCard class="mt-6">
    <!-- Title sets to the task title -->
    <VCardTitle class="mb-4">{{ props.task.title }}</VCardTitle>
    <VCardText class="text-truncate mt-n2">
      DUE: {{ new Date(task.dueDate).toLocaleString() }}
    </VCardText>
    <VCardText class="text-truncate mt-n2">
      {{ props.task.description }}
    </VCardText>
    <VCardActions class="mt-n4">
      <!-- Runs the completeTask function and sets the completedId -->
      <VBtn
        v-if="userStore.user?.accountType === AccountType.User"
        color="#ffd707"
        @click.stop="
          completedId = task.id;
          completeTask();
        "
      >
        SET AS COMPLETE
      </VBtn>
      <!-- Redirects to the tasks with the edit query -->
      <VBtn color="#ffd707" :to="'/tasks?edit=' + task.id">EDIT TASK</VBtn>
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
