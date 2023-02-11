<template>
  <table class="table-auto bg-transparent w-full border-collapse select-none">
    <thead class="sticky top-0 bg-white">
      <tr>
        <th
          v-for="cell in headCells"
          :key="cell.id"
          :class="{
            'hover:bg-slate-50 hover:cursor-pointer': cell.isSortable,
          }"
          class="px-6 py-3 border-t border-zinc-200 whitespace-nowrap font-semibold text-xs text-zinc-400 text-left"
          @click="() => cell.isSortable && emit('sort', cell.id)"
        >
          <span class="flex">
            {{ cell.text }}
            <span v-show="cell.isSortable" class="flex">
              <icon-arrow-up-outlined
                :class="{ 'stroke-zinc-600': cell.isSorting === 'DESC' }"
                width="14"
                class="stroke-zinc-400 stroke-2 ml-2"
              />
              <icon-arrow-down-outlined
                :class="{ 'stroke-zinc-600': cell.isSorting === 'ASC' }"
                width="14"
                class="stroke-zinc-400 stroke-2"
              />
            </span>
          </span>
        </th>
      </tr>
    </thead>

    <tbody class="border-t-2">
      <tr
        v-for="row in bodyRows"
        :key="row.id"
        class="hover:bg-slate-50 hover:cursor-pointer"
      >
        <my-transaction-table-body-cell :text="row.account.name" />
        <my-transaction-table-body-cell :text="row.account.bank" />
        <my-transaction-table-body-cell :text="row.reference" />
        <my-transaction-table-body-cell
          :text="row.category.name"
          :color="row.category.color"
        />
        <my-transaction-table-body-cell
          :text="new Date(row.date).toLocaleDateString('us-US')"
          class="w-0 text-center"
        />
        <my-transaction-table-body-cell
          :text="new Intl.NumberFormat('us-US', {}).format(row.amount)"
          :hint="row.currency"
          class="w-0 text-right"
        />
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  headCells: {
    type: Array,
    required: true,
  },
  bodyRows: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["sort"]);
</script>
