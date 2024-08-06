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
        <!-- Name -->
        <VTextField
          :autofocus="true"
          label="Name"
          v-model="name"
          style="margin-top: -2px"
        ></VTextField>
        <div class="d-flex">
          <VTextField
            v-model="student"
            label="Student Email"
            @keydown.enter="addStudent"
          ></VTextField>
          <VIcon @click="addStudent" class="mt-3">mdi-plus</VIcon>
        </div>

        <VDataTable
          v-if="addedStudents![0]"
          :headers="tableHeader"
          :items="addedStudents"
        ></VDataTable>
      </VContainer>
      <VCardActions>
        <VSpacer />
        <VBtn @click="$emit('classAdd')" color="#ffd707" class="mr-3">
          <slot name="button" />
        </VBtn>
        <VBtn @click="show = false">Cancel</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
// Defining the show model that will make the parent component use addDialog and show the dialog
import { ref } from "vue";

const show = defineModel<boolean>();

const student = ref("");

// Defines a model for each text field to handle the task details
const name = defineModel("name");

const tableHeader = [{ key: "email", title: "Email" }];

const addedStudents = defineModel<{ email: string }[]>("students");

async function addStudent() {
  addedStudents.value!.push({
    email: student.value
  });
}

// Defines the taskAdd emit, which will run a function on the parent component
defineEmits(["classAdd"]);
</script>
