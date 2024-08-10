<!--
Name: Jensen Stamp
Description: This is the sidebar that contains all navigation links to other pages
Details: This will be displayed on every page, but only when logged in
Date: 2/8/24
-->
<template>
  <VNavigationDrawer width="210" color="#181818" floating permanent>
    <!-- List to hold each navigation item, "to" sets the page it will direct to -->
    <VList color="gold" density="compact" nav>
      <!-- Home -->
      <VListItem prepend-icon="mdi-home" title="Home" to="/"></VListItem>
      <!-- Settings -->
      <VListItem
        prepend-icon="mdi-cog"
        title="Settings"
        to="/settings"
      ></VListItem>
      <!-- Classes -->
      <VListItem
        prepend-icon="mdi-human-male-board"
        title="Classes"
        to="/classes"
      ></VListItem>
      <!-- Tasks -->
      <VListItem
        prepend-icon="mdi-clipboard-edit"
        title="Tasks"
        to="/tasks"
      ></VListItem>
      <!-- Assigned Tasks -->
      <VListItem
        v-if="userStore.user?.accountType === AccountType.User"
        prepend-icon="mdi-clipboard-text"
        title="Assigned Tasks"
        to="/assigned"
      ></VListItem>
      <!-- Upcoming Tasks -->
      <VListItem
        prepend-icon="mdi-clipboard-clock"
        title="Upcoming Tasks"
        to="/upcoming"
      ></VListItem>
      <!-- Task History -->
      <VListItem
        prepend-icon="mdi-clipboard-search"
        title="Task History"
        to="/history"
      ></VListItem>
    </VList>
    <!-- Appends the Logout button (displays it at the bottom) -->
    <template #append>
      <VListItem>{{ userStore.user?.username }}</VListItem>

      <!-- Logout -->
      <!-- userStore.logout removes the token and redirects to home -->
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
import { AccountType } from "@/gql/graphql.ts";

// Defines the user from the user store, used above to determine if logged in or not
const userStore = useUserStore();
</script>
