<!--
Name: Jensen Stamp
Description: This is the header bar that contains the website title
Details: This will be displayed on every page, whether logged out or not
Date: 2/8/24
-->
<template>
  <VAppBar :elevation="0" color="#181818">
    <!-- If the user is logged in, the bell and hamburger icon will be displayed on the right -->
    <template #append v-if="userStore.user">
      <VBtn icon="mdi-bell" class="mr-2" color="white"></VBtn>
      <VAppBarNavIcon class="mr-2" color="white"></VAppBarNavIcon>
    </template>
    <!-- Else (not logged in), the register and login button will be displayed on the right -->
    <template #append v-else>
      <!-- Buttons that direct to register or login pages -->
      <VBtn to="/register" color="gold" class="mr-2">Register</VBtn>
      <VBtn to="/login" color="gold" class="mr-2">Login</VBtn>
    </template>
    <!-- RouterLink makes the title clickable, which redirects to the homepage -->
    <RouterLink to="/" style="text-decoration: none; padding-left: 60px">
      <!-- Title of the website -->
      <VAppBarTitle style="color: #ffd707; font-size: 20px">
        Trackers
      </VAppBarTitle>
    </RouterLink>
    <!-- If the user is logged in, the searchbar will be shown -->
    <div
      v-if="userStore.user"
      class="d-flex justify-center align-center"
      style="margin-left: 90px; width: 200px"
    >
      <VTextField
        variant="outlined"
        density="compact"
        style="height: 40px"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search Everything"
      ></VTextField>
    </div>
  </VAppBar>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user.ts";

// Defines the user from the user store, used above to determine if logged in or not
const userStore = useUserStore();
</script>
