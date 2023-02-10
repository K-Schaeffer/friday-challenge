<template>
  <th
    :class="{ 'text-zinc-600': text !== '' }"
    class="px-6 py-4 border-y border-zinc-200 whitespace-nowrap text-xs font-semibold text-zinc-400 text-left"
  >
    <div
      class="inline rounded px-2 py-1"
      :style="{ 'background-color': `#${color}` }"
    >
      {{ text || "No reference provided" }}
    </div>
    <span class="text-zinc-400"> {{ hint }} </span>
  </th>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "",
  },
  hint: {
    type: String,
    default: "",
  },
});
</script>
