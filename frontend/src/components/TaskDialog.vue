<!--
Name: Jensen Stamp
Description: This is the dialog that displays to input task details for creating a task
Details: The parent component is only the TaskList.vue
Date: 2/8/24
-->
<template>
  <VDialog v-model="show" width="800">
    <VCard>
      <VToolbar color="#323232">
        <!-- Slot to name the dialog as "edit" or "create" -->
        <VCardTitle><slot name="title" /></VCardTitle>
      </VToolbar>
      <!-- All text fields that are bound to the defineModels below -->
      <VContainer>
        <!-- Title -->
        <VTextField
          :autofocus="true"
          label="Title"
          v-model="title"
          style="margin-top: -2px"
        ></VTextField>
        <p style="color: #9d9d9d; font-size: 12px" class="mt-n4 mb-2">
          Must contain at least 1 character
        </p>
        <!-- Description -->
        <VTextField
          label="Description"
          v-model="description"
          style="margin-top: -2px"
        ></VTextField>
        <!-- Notes -->
        <VTextField
          label="Notes"
          v-model="notes"
          style="margin-top: -2px"
        ></VTextField>
        <!-- Due Date (Date input) -->
        <div class="d-flex">
          <VDateInput
            reactive
            prepend-icon=""
            label="Due Date"
            v-model="dueDate"
          ></VDateInput>
          <!-- Due Date (Time input) -->
          <VTextField
            label="Due Time"
            v-model="dueTime"
            style="margin-top: 8px"
            type="time"
          ></VTextField>
        </div>
        <!-- Priority -->
        <VNumberInput
          style="border-radius: 4px"
          label="Priority"
          v-model="priority"
          :min="0"
          :max="100"
        ></VNumberInput>
        <p class="mt-n4" style="font-size: 12px; color: #9d9d9d">
          Higher = Prioritised (Max 100)
        </p>
        <slot name="options"></slot>
      </VContainer>
      <VCardActions>
        <VSpacer />
        <VBtn @click="$emit('taskAdd')" color="#ffd707" class="mr-3">
          <slot name="button" />
        </VBtn>
        <VBtn @click="show = false">Cancel</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
// Defining the show model that will make the parent component use addDialog and show the dialog
const show = defineModel<boolean>();

// Defines a model for each text field to handle the task details
const title = defineModel("title");
const description = defineModel("description");
const notes = defineModel<string | null>("notes");
const dueDate = defineModel<Date | null>("dueDate");
const dueTime = defineModel<string>("dueTime");
const priority = defineModel<number>("priority");

// Defines the taskAdd emit, which will run a function on the parent component
defineEmits(["taskAdd"]);
</script>
