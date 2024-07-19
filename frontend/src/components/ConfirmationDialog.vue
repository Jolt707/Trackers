<template>
  <VDialog v-model="confirmation" width="800">
    <VCard>
      <VToolbar color="#323232">
        <VCardTitle>WHAT IS HAPPENING</VCardTitle>
      </VToolbar>
      <VCardText>Are you sure bro?</VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn @click="$emit('submit')" color="#ffd707" class="mr-3">
          Delete
        </VBtn>
        <VBtn @click="confirmation = false">Cancel</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
const confirmation = defineModel<boolean>();

defineEmits(["submit"]);
</script>
