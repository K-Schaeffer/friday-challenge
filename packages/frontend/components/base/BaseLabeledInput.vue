<template>
  <div>
    <label
      :for="attrs.name"
      class="font-semibold text-sm text-zinc-400 block pb-1"
    >
      {{ label }}
    </label>
    <div
      class="flex items-center border border-zinc-400 rounded hover:border-zinc-900 focus-within:border-zinc-900"
    >
      <slot name="prepend-icon" />
      <input
        v-model="value"
        v-bind="attrs"
        :class="{
          'cursor-not-allowed': attrs.disabled,
        }"
        class="p-2 w-full text-md text-zinc-600 placeholder-zinc-400 focus:outline-none"
      />
    </div>
  </div>
</template>

<script setup>
const attrs = useAttrs();

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
