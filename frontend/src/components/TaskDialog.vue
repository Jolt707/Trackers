<template>
  <VDialog v-model="model" width="800">
    <VCard>
      <VToolbar color="#323232">
        <VCardTitle><slot name="title" /></VCardTitle>
      </VToolbar>
      <VContainer>
        <VTextField
          :autofocus="true"
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
        <div class="d-flex">
          <VDateInput
            prepend-icon=""
            label="Due Date"
            v-model="dueDate"
          ></VDateInput>
          <VTextField
            label="Due Time"
            v-model="dueTime"
            style="margin-top: 8px"
          ></VTextField>
        </div>

        <VNumberInput
          label="Priority"
          v-model="priority"
          :min="0"
          :max="100"
        ></VNumberInput>
        <p class="mt-n4" style="font-size: 15px; color: #9d9d9d">
          Higher = Prioritised
        </p>
      </VContainer>
      <VCardActions>
        <VSpacer />
        <VBtn @click="$emit('taskAdd')" color="#ffd707" class="mr-3">
          <slot name="button" />
        </VBtn>
        <VBtn @click="model = false">Cancel</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();

const title = defineModel("title");
const description = defineModel("description");
const notes = defineModel("notes");
const dueDate = defineModel<Date>("dueDate");
const dueTime = defineModel<string>("dueTime");
const priority = defineModel("priority");

defineEmits(["taskAdd"]);
</script>
