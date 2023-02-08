<template>
  <table class="table-auto bg-transparent w-full border-collapse select-none">
    <thead class="sticky top-0 bg-white">
      <tr>
        <th
          v-for="(cell, index) in headCells"
          :key="index"
          class="px-6 py-3 border-t border-zinc-200 whitespace-nowrap font-semibold text-xs text-zinc-400 text-left"
          :class="{
            'hover:bg-slate-50 hover:cursor-pointer': cell.isClickable,
          }"
        >
          {{ cell.text }}
        </th>
      </tr>
    </thead>

    <tbody class="border-t-2">
      <tr
        v-for="(row, rowIndex) in bodyRows"
        :key="rowIndex"
        class="hover:bg-slate-50 hover:cursor-pointer"
      >
        <th
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          :class="{ 'text-zinc-600': cell.text !== 'No reference provided' }"
          class="px-6 py-4 border-y border-zinc-200 whitespace-nowrap text-xs font-semibold text-zinc-400 text-left"
        >
          <div
            class="inline rounded px-2 py-1"
            :style="{ 'background-color': cell.color }"
          >
            {{ cell.text }}
          </div>
          <span class="text-zinc-400"> {{ cell.hint }} </span>
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const headCells = [
  { text: "Reference" },
  { text: "Category" },
  { text: "Date", isClickable: true },
  { text: "Amount", isClickable: true },
];

const bodyRows = [
  [
    { text: "No reference provided" },
    { text: "Foo" },
    { text: "Foo" },
    { text: "Foo" },
  ],
  [
    { text: "No reference provided" },
    { text: "Tax refund", color: "#FAFA" },
    { text: "Foo" },
    { text: "Foo", hint: "Foo" },
  ],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
  [{ text: "Foo" }, { text: "Foo" }, { text: "Foo" }, { text: "Foo" }],
];
</script>
