<!--
Name: Jensen Stamp
Description: This is the main homepage for the user and being logged out
Details: Uses the TaskCard.vue component
Date: 2/8/24
-->
<template>
  <!-- If the user is logged out, the homepage will be shown -->
  <template v-if="!userStore.user">
    <VCardTitle class="d-flex justify-center text-lg-h3">Trackers</VCardTitle>
  </template>

  <!-- If the user is signed in, the users homepage will be shown -->
  <template v-else>
    <VContainer class="px-10">
      <div class="d-flex justify-space-between mx-10">
        <div class="d-flex flex-column align-center">
          <!-- Help page button -->
          <h3>Go to help page</h3>
          <!-- Redirects to the help page -->
          <VBtn class="mt-2" size="150px" color="#ffd707" to="/help">
            <VIcon size="75px">mdi-information</VIcon>
          </VBtn>
        </div>
        <div class="d-flex flex-column align-center">
          <!-- Class page -->
          <h3>Manage Classes</h3>
          <!-- Redirects to the classes page -->
          <VBtn class="mt-2" size="150px" color="#ffd707" to="/help">
            <VIcon size="75px">mdi-human-male-board</VIcon>
          </VBtn>
        </div>
        <div class="d-flex flex-column align-center">
          <!-- Create Task icon -->
          <h3>Create a Task</h3>
          <!-- Redirects to the tasks page with the create query (opens the dialog) -->
          <VBtn class="mt-2" size="150px" color="#ffd707" to="/tasks?create=1">
            <VIcon size="75px">mdi-plus</VIcon>
          </VBtn>
        </div>
        <div class="d-flex flex-column align-center">
          <h3>Assigned Tasks</h3>
          <!-- Redirects to the assigned page -->
          <VBtn class="mt-2" size="150px" color="#ffd707" to="/assigned">
            <VIcon size="75px">mdi-clipboard-text</VIcon>
          </VBtn>
        </div>
        <div class="d-flex flex-column align-center">
          <h3>Upcoming Tasks</h3>
          <VBtn class="mt-2" size="150px" color="#ffd707" to="/upcoming">
            <VIcon size="75px">mdi-clipboard-clock</VIcon>
          </VBtn>
        </div>
      </div>

      <!-- If there are no tasks, an icon and text will be shown instead of the tasks -->
      <div
        v-if="!tasks[0]"
        class="d-flex w-100 flex-column justify-center align-center mt-10"
      >
        <h2 style="color: #696969">You have no pending tasks</h2>
        <p style="color: #696969">Create a Task on the tasks page</p>

        <VIcon size="150px" style="color: #696969">
          mdi-close-circle-outline
        </VIcon>
      </div>

      <div v-else class="mt-10">
        <h1>Next Assignments</h1>
        <div class="d-flex flex-wrap">
          <VSlideGroup>
            <!-- Displays all Tasks with TaskCard in order of dueDate -->
            <TaskCard
              @refresh="refresher"
              v-for="task in tasks
                .concat()
                .sort(
                  (a, b) =>
                    new Date(a.dueDate).getTime() -
                    new Date(b.dueDate).getTime()
                )"
              :key="task.id"
              :task="task"
              class="mb-6 mr-4"
            ></TaskCard>
          </VSlideGroup>
        </div>

        <h1 class="mt-6">All Assignments</h1>
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
