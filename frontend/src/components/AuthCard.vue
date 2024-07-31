<template>
  <!--
  Name:
  Description:
  Date: 7/31/24
  -->
  <VContainer class="d-flex justify-center align-center h-100">
    <VCard class="pa-8 w-25">
      <VCardTitle class="text-center text-h5">
        {{ props.title }} to
        <span style="color: #ffd707">Trackers</span>
      </VCardTitle>
      <VTextField
        label="Username"
        v-model="username"
        @keydown.enter="$emit('auth')"
      ></VTextField>
      <slot name="inputs" />
      <VTextField
        @keydown.enter="$emit('auth')"
        label="Password"
        v-model="password"
        type="password"
      ></VTextField>
      <VCardActions>
        <VSpacer></VSpacer>
        <VBtn @click="$emit('auth')" variant="tonal" color="gold">
          {{ props.title }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VContainer>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String
});
defineEmits(["auth"]);
const username = defineModel("username");
const password = defineModel("password");
</script>
