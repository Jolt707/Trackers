<template>
  <VDialog v-model="model" width="800">
    <VCard>
      <VToolbar color="#323232">
        <VCardTitle>Create Task</VCardTitle>
      </VToolbar>
      <VContainer>
        <VTextField
          label="Title"
          v-model="title"
          style="margin-top: -2px"
        ></VTextField>
        <VTextField
          label="Description"
          v-model="description"
          style="margin-top: -2px"
        ></VTextField>
        <VTextField
          label="Notes"
          v-model="notes"
          style="margin-top: -2px"
        ></VTextField>
        <VTextField
          label="Due Date"
          v-model="dueDate"
          style="margin-top: -2px"
        ></VTextField>
        <VTextField
          label="Priority"
          v-model="priority"
          style="margin-top: -2px"
        ></VTextField>
      </VContainer>
      <VCardActions>
        <VSpacer />
        <VBtn @click="$emit('taskAdd')" color="#ffd707" class="mr-3">
          Continue
        </VBtn>
        <VBtn>Cancel</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();

const title = defineModel("title");
const description = defineModel("description");
const notes = defineModel("notes");
const dueDate = defineModel("dueDate");
const priority = defineModel("priority");
</script>
