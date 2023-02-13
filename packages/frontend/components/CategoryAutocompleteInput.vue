<template>
  <BaseLabeledInput
    v-model="value"
    :disabled="isDisabled"
    type="text"
    name="name"
    label="Name"
    class="max-h-8"
    list="categories"
    placeholder="Select or create a new category"
  />
  <datalist id="categories" class="w-full h-full">
    <option
      v-for="category in categories"
      :key="category.id"
      :value="category.id"
    >
      {{ category.name }}
    </option>
  </datalist>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  categories: {
    type: Array,
    default: () => [],
  },
  isDisabled: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
