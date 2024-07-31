<template>
  <VAppBar :elevation="0" color="#181818">
    <template #append v-if="userStore.user">
      <VBtn icon="mdi-bell" class="mr-2" color="white"></VBtn>
      <VAppBarNavIcon class="mr-2" color="white"></VAppBarNavIcon>
    </template>
    <template #append v-else>
      <VBtn to="/register" color="gold" class="mr-2">Register</VBtn>
      <VBtn to="/login" color="gold" class="mr-2">Login</VBtn>
    </template>
    <RouterLink to="/" style="text-decoration: none; padding-left: 60px">
      <VAppBarTitle style="color: #ffd707; font-size: 20px">
        Trackers
      </VAppBarTitle>
    </RouterLink>
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

const userStore = useUserStore();
</script>
