<template>
  <v-container class="d-flex justify-center align-center h-100">
    <v-card class="pa-8 w-25">
      <v-card-title class="text-center text-h5">
        {{ props.title }} to
        <span style="color: #ffd707">Trackers</span>
      </v-card-title>
      <v-text-field label="Username" v-model="username" @keydown.enter="$emit('auth')"></v-text-field>
      <slot name="inputs" />
      <v-text-field
          @keydown.enter="$emit('auth')"
        label="Password"
        v-model="password"
        type="password"
      ></v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('auth')" variant="tonal" color="gold">
          {{ props.title }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String
});
defineEmits(["auth"]);
const username = defineModel("username");
const password = defineModel("password");
</script>
