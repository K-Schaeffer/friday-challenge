<template>
  <div>
    <BaseLabeledInput
      v-model="value"
      :disabled="isDisabled"
      label="Search"
      type="text"
      name="search"
      placeholder="Search by bank, account, reference, category, date, amount, currency..."
    >
      <template #prepend-icon>
        <IconOutlinedMagnify width="20" class="stroke-zinc-400 stroke-2 ml-2" />
      </template>
    </BaseLabeledInput>
  </div>
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
