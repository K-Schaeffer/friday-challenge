<template>
  <BaseLabeledInput
    v-model="value"
    :disabled="isDisabled"
    type="color"
    name="color"
    label="Color"
    class="max-w-5"
    :class="{
      'cursor-not-allowed': isDisabled,
      'cursor-pointer': !isDisabled,
    }"
  />
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  isDisabled: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
