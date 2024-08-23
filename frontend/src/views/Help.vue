<!--
Name: Jensen Stamp
Description: This is the help page that displays information for teachers/students to use the website
Details: Uses no custom components
Date: 8/23/24
-->

<template>
  <VContainer>
    <!-- Student help page -->
    <template v-if="userStore.user?.accountType === AccountType.User">
      <h1>Help</h1>
      <VToolbar class="mb-4 pl-6" style="border-radius: 4px">
        Student Task Help
      </VToolbar>
      <VCard class="mb-6 pl-6 mt-4 pa-6">
        <h3>Step 1</h3>
        <p class="mb-3">
          Go to the tasks page using the sidebar, or second large button on the
          homepage
        </p>
        <h3>Step 2</h3>
        <p class="mb-2">
          Create a task using the
          <span>
            <VBtn
              class="mb-1"
              variant="tonal"
              icon="mdi-plus"
              color="#ffd707"
              size="43px"
            ></VBtn>
          </span>
          on the far right, a dialog will open
        </p>
        <h3>Step 3</h3>
        <p class="mb-3">
          Input the details of your task, ensure that you at least have a title,
          every other field can be empty, hit the continue button
        </p>
        <VDivider class="my-6"></VDivider>
        <h3>
          Complete Task
          <VBtn
            class="mb-1"
            variant="tonal"
            icon="mdi-check"
            color="green"
            size="43px"
          ></VBtn>
        </h3>
        <p class="mb-3">
          This button will complete a task, you can view your recently completed
          tasks in "Task History", completed tasks CANNOT be edited
        </p>
        <h3>
          Edit Task
          <VBtn
            class="mb-1"
            variant="tonal"
            icon="mdi-pencil"
            color="blue"
            size="43px"
          ></VBtn>
        </h3>
        <p class="mb-3">
          This button will bring up a dialog to edit the details of a task, so
          you can set a new description, notes, etc
        </p>
        <h3>
          Delete Task
          <VBtn
            class="mb-1"
            variant="tonal"
            icon="mdi-delete"
            color="red"
            size="43px"
          ></VBtn>
        </h3>
        <p class="mb-3">
          This button will permanently delete a task, meaning you will never be
          able to see its details
        </p>
      </VCard>
      <VToolbar class="mb-4 pl-6 mt-4" style="border-radius: 4px">
        Student Class Help
      </VToolbar>
      <VCard class="mb-6 pl-6 mt-4 pa-6">
        <h3>Contact your teacher</h3>
        <p>
          Classes and assigned tasks are managed by teachers, give your teacher
          your email so they can add you to their class
        </p>
      </VCard>
    </template>
    <!-- Teacher help page -->
    <template v-if="userStore.user?.accountType === AccountType.Teacher">
      <h1>Help</h1>
      <VToolbar class="mb-4 pl-6" style="border-radius: 4px">
        Teacher Class Help
      </VToolbar>
      <VCard class="mb-6 pl-6 mt-4 pa-6">
        <h3>Step 1</h3>
        <p class="mb-3">Go to the classes page using the sidebar</p>
        <h3>Step 2</h3>
        <p class="mb-3">
          Create a class using the
          <span>
            <VBtn
              class="mb-1"
              variant="tonal"
              icon="mdi-plus"
              color="#ffd707"
              size="43px"
            ></VBtn>
          </span>
          on the far right, a dialog will open to input details
        </p>
        <h3>Step 3</h3>
        <p class="mb-3">
          Make a name for the class and input the emails of students that have
          signed up to the website, make sure to hit the plus icon to add each
          student to a table
        </p>
        <VDivider class="my-6"></VDivider>
        <h3>
          Edit Class
          <VBtn
            class="mb-1"
            variant="tonal"
            icon="mdi-pencil"
            color="blue"
            size="43px"
          ></VBtn>
        </h3>

        <p class="mb-3">
          This button will bring up a dialog to edit the name of a task
        </p>
        <h3>
          Delete Class
          <VBtn
            class="mb-1"
            variant="tonal"
            icon="mdi-delete"
            color="red"
            size="43px"
          ></VBtn>
        </h3>
        <p class="mb-3">
          This button will permanently delete a class, meaning you will never be
          able to see its details
        </p>
        <h3>
          Add students button
          <VChip class="mb-1">
            <VIcon>mdi-plus</VIcon>
          </VChip>
        </h3>
        <p>
          This button will bring up a dialog allowing you to add more emails
        </p>
        <p class="mb-3">
          NOTE: Trying to add an existing students' email will remove them from
          the class
        </p>
        <h3>
          Add tasks button
          <VChip class="mb-1">
            <VIcon>mdi-plus</VIcon>
          </VChip>
        </h3>
        <p>
          This button will bring up a dialog, allowing you to add more tasks
        </p>
        <p class="mb-3">
          NOTE: Trying to add an existing task to a class will remove it,
          unselect the current tasks before adding new ones
        </p>
      </VCard>
      <VToolbar class="mb-4 pl-6" style="border-radius: 4px">
        Teacher Task Help
      </VToolbar>
      <VCard class="mb-10 pl-6 mt-4 pa-6">
        <h3>Step 1</h3>
        <p class="mb-3">
          Go to the tasks page using the sidebar, or second large button on the
          homepage
        </p>
        <h3>Step 2</h3>
        <p class="mb-3">
          Create a task using
          <span>
            <VBtn
              class="mb-1"
              variant="tonal"
              icon="mdi-plus"
              color="#ffd707"
              size="43px"
            ></VBtn>
          </span>
          on the far right, a dialog will open to input details
        </p>
        <h3>Step 3</h3>
        <p class="mb-3">
          Input the details of your task, ensure that you at least have a title,
          every other field can be empty, hit the continue button
        </p>
        <VDivider class="my-6"></VDivider>

        <h3>
          Edit Task
          <VBtn
            class="mb-1"
            variant="tonal"
            icon="mdi-pencil"
            color="blue"
            size="43px"
          ></VBtn>
        </h3>

        <p class="mb-3">
          This button will bring up a dialog to edit the details of a task, so
          you can set a new description, notes, etc
        </p>
        <h3>
          Delete Task
          <VBtn
            class="mb-1"
            variant="tonal"
            icon="mdi-delete"
            color="red"
            size="43px"
          ></VBtn>
        </h3>
        <p class="mb-3">
          This button will permanently delete a task, meaning you will never be
          able to see its details
        </p>
        <h3>
          Add classes button
          <VChip class="mb-1">
            <VIcon>mdi-plus</VIcon>
          </VChip>
        </h3>
        <p class="mb-3">
          NOTE: Trying to add an existing class to a task will remove it,
          unselect the already added classes before adding new ones
        </p>
      </VCard>
    </template>
  </VContainer>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user.ts";
import { AccountType } from "@/gql/graphql.ts";

// Defines the user from the user store, used above to determine if logged in or not
const userStore = useUserStore();
</script>
