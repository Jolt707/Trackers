<template>
  <v-app>
    <v-main>
      <Navbar></Navbar>
      <Sidebar v-if="userStore.user"></Sidebar>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style scoped></style>

<script setup lang="ts">
import { useUserStore } from "@/stores/user.ts";
import { onMounted } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";

const userStore = useUserStore();
onMounted(() => {
  userStore.getUser();
});
</script>
