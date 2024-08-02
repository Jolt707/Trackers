<template>
  <!--
  Name: Jensen Stamp
  Description: Card component used in the /login and /register pages
  Details: For this component "parent component" refers to either "Login.vue" or "Register.vue"
  Date: 2/8/24
  -->
  <VContainer class="d-flex justify-center align-center h-100">
    <VCard class="pa-8 w-25">
      <VCardTitle class="text-center text-h5">
        <!-- Using the title prop to change the title since the component is reused -->
        {{ props.title }} to
        <span style="color: #ffd707">Trackers</span>
      </VCardTitle>
      <!-- Username field, sets the model to the user input -->
      <VTextField
        label="Username"
        v-model="username"
        @keydown.enter="$emit('auth')"
      ></VTextField>
      <!-- This slot is used to add an extra field to the AuthCard (email field on register page -->
      <slot name="inputs" />
      <!-- Password field, sets the model to the user input -->
      <VTextField
        @keydown.enter="$emit('auth')"
        label="Password"
        v-model="password"
        type="password"
      ></VTextField>
      <VCardActions>
        <VSpacer></VSpacer>
        <!-- Button to emit "auth" which will run a function on the parent component -->
        <VBtn @click="$emit('auth')" variant="tonal" color="gold">
          <!-- Reused props.title to change the button name to "login" or "register" -->
          {{ props.title }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VContainer>
</template>

<script setup lang="ts">
// Defining a title prop that can be used by the parent to change the title for each page
const props = defineProps({
  title: String
});

// Defining an emit that can be used by the parent to run a function
defineEmits(["auth"]);

// Defining a model that sends the VTextField inputs to the parent component
const username = defineModel("username");
const password = defineModel("password");
</script>
