<template>
  <template v-if="!userStore.user">
    <v-card-title class="d-flex justify-center text-lg-h3">
      Trackers
    </v-card-title>
  </template>
  <template v-else>
    <VContainer>
      <h1>Logged in {{ userStore.user.username }}</h1>
      <div class="d-flex">
        <TaskCard v-for="t in tasks" :key="t.id" :task="t"></TaskCard>
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

onMounted(async () => {
  tasks.value = await getTasks();
});

onMounted(() => {
  document.title = "Home";
});
</script>
