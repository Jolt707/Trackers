<!--
Name: Jensen Stamp
Description: This is the main homepage for the user and being logged out
Details: Uses the TaskCard.vue component
Date: 2/8/24
-->
<template>
  <!-- If the user is logged out, the homepage will be shown -->
  <template v-if="!userStore.user">
    <v-card-title class="d-flex justify-center text-lg-h3">
      Trackers
    </v-card-title>
  </template>

  <!-- If the user is signed in, the users homepage will be shown -->
  <template v-else>
    <VContainer class="px-10">
      <div class="d-flex justify-space-between mx-10">
        <div class="d-flex flex-column align-center">
          <!-- Create Task icon -->
          <h2>Create a Task</h2>
          <!-- Redirects to the tasks page with the create query (opens the dialog) -->
          <VBtn size="100px" color="#ffd707" to="/tasks?create=1">
            <VIcon size="66px">mdi-plus</VIcon>
          </VBtn>
        </div>
        <div class="d-flex flex-column align-center">
          <h2>Go to Assigned Tasks</h2>
          <!-- Redirects to the assigned page -->
          <VBtn size="100px" color="#ffd707" to="/assigned">
            <VIcon size="66px">mdi-clipboard-text</VIcon>
          </VBtn>
        </div>
        <div class="d-flex flex-column align-center">
          <h2>Go to Upcoming Tasks</h2>
          <VBtn size="100px" color="#ffd707" to="/upcoming">
            <VIcon size="66px">mdi-clipboard-clock</VIcon>
          </VBtn>
        </div>
      </div>

      <h1>Next Assignments</h1>
      <div class="d-flex flex-wrap">
        <template v-if="!tasks[0]">
          <div class="d-flex w-100 flex-column justify-center align-center">
            <VIcon size="150px" class="">mdi-close-circle-outline</VIcon>
            <h3>No assignments</h3>
          </div>
        </template>
        <VSlideGroup>
          <!-- Displays all Tasks with TaskCard in order of dueDate -->
          <TaskCard
            @refresh="refresher"
            v-for="task in tasks
              .concat()
              .sort(
                (a, b) =>
                  new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
              )"
            :key="task.id"
            :task="task"
            class="mb-6 mr-4"
          ></TaskCard>
        </VSlideGroup>
      </div>

      <h1 class="mt-6">All Assignments</h1>
      <!-- If there are no tasks, an icon and text will be shown instead of the tasks -->
      <template v-if="!tasks[0]">
        <div class="d-flex w-100 flex-column justify-center align-center">
          <VIcon size="150px" class="">mdi-close-circle-outline</VIcon>
          <h3>No assignments</h3>
        </div>
      </template>
      <div class="d-flex">
        <VSlideGroup>
          <!-- Displays all Tasks with TaskCard in order of priority -->
          <TaskCard
            @refresh="refresher"
            v-for="task in tasks
              .concat()
              .sort((a, b) => b.priority - a.priority)"
            :key="task.id"
            :task="task"
            class="mb-6 mr-4"
          ></TaskCard>
        </VSlideGroup>
      </div>
    </VContainer>
  </template>
</template>

<style scoped></style>

<script setup lang="ts">
import { useUserStore } from "@/stores/user.ts";
import { onMounted, ref } from "vue";
import TaskCard from "@/components/TaskCard.vue";
import { Task } from "@/gql/graphql.ts";
import { getTasks } from "@/composables/getTasks.ts";

const userStore = useUserStore();

const tasks = ref<Task[]>([]);

async function refresher() {
  tasks.value = await getTasks();
  console.log(tasks);
}

onMounted(async () => {
  tasks.value = await getTasks();
});

onMounted(() => {
  document.title = "Home";
});
</script>
