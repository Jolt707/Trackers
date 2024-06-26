<template>
  <v-card class="pa-5" color="">
    <v-card-title>
      {{ props.title }}
    </v-card-title>
    <v-text-field label="Username" v-model="username"></v-text-field>
    <slot name="inputs" />
    <v-text-field label="Password" v-model="password"></v-text-field>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="$emit('auth', {})" border="">Deez</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String
});
const username = defineModel("username");
const password = defineModel("password");
</script>
