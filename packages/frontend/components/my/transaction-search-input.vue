<template>
  <div>
    <label for="search" class="font-semibold text-sm text-zinc-400 block pb-1">
      Search
    </label>
    <div
      class="flex items-center border border-zinc-400 rounded hover:border-zinc-900 focus-within:border-zinc-900"
    >
      <icon-magnify-outlined width="20" class="stroke-zinc-400 stroke-2 ml-2" />
      <input
        v-model="value"
        :disabled="isDisabled"
        type="text"
        name="search"
        placeholder="Search by bank, account, reference, category, date, amount, currency..."
        class="p-2 w-full text-md text-zinc-600 placeholder-zinc-400 focus:outline-none disabled:cursor-not-allowed"
      />
    </div>
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
