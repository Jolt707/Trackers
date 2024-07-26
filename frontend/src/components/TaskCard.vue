<template>
  <VCard class="mt-6">
    <VCardTitle class="mb-4">{{ props.task.title }}</VCardTitle>
    <VCardText class="text-truncate mt-n2">
      DUE: {{ new Date(task.dueDate).toLocaleString() }}
    </VCardText>
    <VCardText class="text-truncate mt-n2">
      {{ props.task.description }}
    </VCardText>
    <VCardActions class="mt-n4">
      <VBtn
        color="#ffd707"
        @click.stop="
          completedId = task.id;
          completeTask();
        "
      >
        SET AS COMPLETE
      </VBtn>
      <VBtn color="#ffd707" :to="'/tasks?edit=' + task.id">EDIT TASK</VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
import { Task } from "@/gql/graphql.ts";
import { ref } from "vue";
import { useApolloClient } from "@vue/apollo-composable";
import { COMPLETE_TASK_QUERY } from "@/graphql/task/completeTask.graphql.ts";

const completedId = ref<number | undefined>(undefined);

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

const props = defineProps<{ task: Task }>();
const emit = defineEmits(["refresh"]);
</script>
