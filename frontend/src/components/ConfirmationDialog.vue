<template>
    <VDialog v-model="confirmation" width="800">
        <VCard>
            <VToolbar color="#323232">
                <VCardTitle>Delete Task?</VCardTitle>
            </VToolbar>
            <VCardText>This will permanently delete the selected task</VCardText>
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
