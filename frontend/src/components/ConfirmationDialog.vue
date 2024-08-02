<!--
Name: Jensen Stamp
Description: Dialog component used to confirm an action to avoid the user accidentally clicking something
Details: The only parent component is TaskList.vue
Date: 2/8/24
-->
<template>
  <VDialog v-model="confirmation" width="800">
    <VCard>
      <VToolbar color="#323232">
        <!-- Slot to change the title of the dialog -->
        <VCardTitle><slot name="title"></slot></VCardTitle>
      </VToolbar>
      <VCardText>
        This will permanently
        <!-- Slot to change the text naming the action -->
        <slot name="text"></slot>
        the selected task
      </VCardText>
      <VCardActions>
        <VSpacer />
        <!-- Button that emits "submit" to the parent component -->
        <VBtn @click="$emit('submit')" color="#ffd707" class="mr-3">
          <slot name="button" />
        </VBtn>
        <!-- Closes the dialog on click by setting confirmation to false -->
        <VBtn @click="confirmation = false">Cancel</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
// Defines "confirmation" model
const confirmation = defineModel<boolean>();

// Defines the emit "submit"
defineEmits(["submit"]);
</script>
