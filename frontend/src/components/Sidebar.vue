<template>
  <v-navigation-drawer width="210" color="#181818" floating permanent>
    <v-list color="gold" density="compact" nav>
      <v-list-item prepend-icon="mdi-home" title="Home" to="/"></v-list-item>
      <v-list-item
        prepend-icon="mdi-cog"
        title="Settings"
        to="/settings"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-clipboard-edit"
        title="Tasks"
        to="/tasks"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-clipboard-text"
        title="Assigned Tasks"
        to="/assigned"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-clipboard-clock"
        title="Upcoming Tasks"
        to="/upcoming"
      ></v-list-item>
    </v-list>
    <template #append>
      <v-list-item
        style="border-radius: 4px !important"
        class="my-2 mx-2"
        base-color="red"
        prepend-icon="mdi-logout"
        title="Logout"
        @click="userStore.logout"
        color="gold"
      ></v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user.ts";

const userStore = useUserStore();
</script>
