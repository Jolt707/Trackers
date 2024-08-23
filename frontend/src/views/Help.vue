<!--
Name: Jensen Stamp
Description: This is the help page that displays information for teachers/students to use the website
Details: Uses no custom components
Date: 8/23/24
-->

<template>
  <VContainer>
    <h1>Help</h1>
    <VToolbar class="mb-4 pl-6" style="border-radius: 4px">
      Student Task Help
    </VToolbar>
    <VCard>
      <h3>Step 1</h3>
      <p>
        Go to the tasks page using the sidebar, or second large button on the
        homepage
      </p>
      <h3>Step 2</h3>
      <p>
        Create a task using the gold plus on the far right, a dialog will open
      </p>
      <h3>Step 3</h3>
      <p>
        Input the details of your task, ensure that you at least have a title,
        every other field can be empty, hit the continue button
      </p>
      <h3>Complete Task (Green tick icon)</h3>
      <p>
        This button will complete a task, you can view your recently completed
        tasks in "Task History"
      </p>
      <h3>Edit Task (Blue pencil icon)</h3>
      <p>
        This button will bring up a dialog to edit the details of a task, so you
        can set a new description, notes, etc
      </p>
      <h3>Delete Task (Red bin icon)</h3>
      <p>
        This button will permanently delete a task, meaning you will never be
        able to see its details
      </p>
    </VCard>
    <VToolbar class="mb-4 pl-6 mt-4" style="border-radius: 4px">
      Student Class Help
    </VToolbar>
  </VContainer>
</template>

<script setup lang="ts"></script>
