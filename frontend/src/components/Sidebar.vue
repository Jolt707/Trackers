<template>
  <VNavigationDrawer width="210" color="#181818" floating permanent>
    <VList color="gold" density="compact" nav>
      <VListItem prepend-icon="mdi-home" title="Home" to="/"></VListItem>
      <VListItem
        prepend-icon="mdi-cog"
        title="Settings"
        to="/settings"
      ></VListItem>
      <VListItem
        prepend-icon="mdi-clipboard-edit"
        title="Tasks"
        to="/tasks"
      ></VListItem>
      <VListItem
        prepend-icon="mdi-clipboard-text"
        title="Assigned Tasks"
        to="/assigned"
      ></VListItem>
      <VListItem
        prepend-icon="mdi-clipboard-clock"
        title="Upcoming Tasks"
        to="/upcoming"
      ></VListItem>
      <VListItem
        prepend-icon="mdi-clipboard-search"
        title="Task History"
        to="/history"
      ></VListItem>
    </VList>
    <template #append>
      <VListItem
        style="border-radius: 4px !important"
        class="my-2 mx-2"
        base-color="red"
        prepend-icon="mdi-logout"
        title="Logout"
        @click="userStore.logout"
        color="gold"
      ></VListItem>
    </template>
  </VNavigationDrawer>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user.ts";

const userStore = useUserStore();
</script>
