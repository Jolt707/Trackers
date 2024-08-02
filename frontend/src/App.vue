<!--
Name: Jensen Stamp
Description: This is the App.vue, which will display components across the entire app
Details: Uses the Navbar.vue and Sidebar.view
Date: 2/8/24
-->
<template>
  <VApp>
    <VMain>
      <Navbar></Navbar>
      <Sidebar v-if="userStore.user"></Sidebar>
      <RouterView></RouterView>
    </VMain>
  </VApp>
</template>

<style scoped></style>

<script setup lang="ts">
import { useUserStore } from "@/stores/user.ts";
import { onMounted } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";

const userStore = useUserStore();

// Gets the user on page load
onMounted(() => {
  userStore.getUser();
});
</script>
