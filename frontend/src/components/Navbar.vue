<template>
  <v-app-bar :elevation="0" color="#181818">
    <template #append v-if="userStore.user">
      <v-btn icon="mdi-bell" class="mr-2" color="white"></v-btn>
      <v-app-bar-nav-icon class="mr-2" color="white"></v-app-bar-nav-icon>
    </template>
    <template #append v-else>
      <v-btn to="/register" color="gold" class="mr-2">Register</v-btn>
      <v-btn to="/login" color="gold" class="mr-2">Login</v-btn>
    </template>
    <router-link to="/" style="text-decoration: none; padding-left: 60px">
      <v-app-bar-title style="color: #ffd707; font-size: 20px">
        Trackers
      </v-app-bar-title>
    </router-link>
    <div v-if="userStore.user"
      class="d-flex justify-center align-center"
      style="margin-left: 90px; width: 200px"
    >
      <v-text-field
        variant="outlined"
        density="compact"
        style="height: 40px"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search Everything"
      ></v-text-field>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user.ts";

const userStore = useUserStore();
</script>
