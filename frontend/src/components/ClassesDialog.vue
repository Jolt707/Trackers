<!--
Name: Jensen Stamp
Description: This is the dialog for inputting class name and students array for creating a class
Details: The parent component is only the ClassesList.vue
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
          label="Class Name"
          v-model="name"
          style="margin-top: -2px"
        ></VTextField>
        <p style="color: #9d9d9d; font-size: 12px" class="mt-n4 mb-2">
          Must contain at least 1 character
        </p>
        <div class="d-flex">
          <!-- Emails, runs a function if enter is pressed to addStudent to the table -->
          <VTextField
            type="email"
            v-model="student"
            label="Student Email"
            @keydown.enter="addStudent"
          ></VTextField>
          <VIcon @click="addStudent" class="mt-3">mdi-plus</VIcon>
        </div>
        <!-- Shows a table if there is at least 1 item -->
        <VDataTable
          v-if="addedStudents![0]"
          :headers="tableHeader"
          :items="addedStudents"
        >
          <template #item.actions="{ item }">
            <VBtn
              variant="text"
              icon="mdi-close"
              @click="removeStudent(item.email)"
            ></VBtn>
          </template>
        </VDataTable>
      </VContainer>
      <VCardActions>
        <VSpacer />
        <!-- Button that emits classAdd -->
        <VBtn @click="$emit('classAdd')" color="#ffd707" class="mr-3">
          <slot name="button" />
        </VBtn>
        <!-- Closes Dialog-->
        <VBtn @click="show = false">Cancel</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
// Defining the show model that will make the parent component use addDialog and show the dialog
import { ref, watch } from "vue";

const show = defineModel<boolean>();
const student = ref("");
// Defines a model for each text field to handle the task details
const name = defineModel("name");
const tableHeader = [
  { key: "email", title: "Email" },
  { key: "actions", title: "Remove" }
];

function removeStudent(email: string) {
  addedStudents.value = addedStudents.value!.filter(
    (student) => student.email !== email
  );
}

const addedStudents = defineModel<{ email: string }[]>("students");

// Function to add a student to the table with the value of their email
async function addStudent() {
  if (addedStudents.value!.find((s) => s.email === student.value)) {
    return;
  }
  // Pushes the added student to an array
  addedStudents.value!.push({
    email: student.value
  });
  student.value = "";
}

watch(
  () => show.value,
  (val) => {
    if (!val) {
      addedStudents.value = [];
    }
  }
);

// Defines the taskAdd emit, which will run a function on the parent component
defineEmits(["classAdd"]);
</script>
