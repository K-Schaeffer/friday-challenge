<template>
  <BaseTable>
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
              <IconOutlinedArrowUp
                :class="{ 'stroke-zinc-600': cell.isSorting === 'DESC' }"
                width="14"
                class="stroke-zinc-400 stroke-2 ml-2"
              />
              <IconOutlinedArrowDown
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
        @click="() => emit('click:row', row.id)"
      >
        <TransactionTableBodyCell :text="row.account.name" />
        <TransactionTableBodyCell :text="row.account.bank" />
        <TransactionTableBodyCell :text="row.reference" />
        <TransactionTableBodyCell
          :text="row.category.name"
          :color="row.category.color"
        />
        <TransactionTableBodyCell
          :text="new Date(row.date).toLocaleDateString('us-US')"
          class="w-0 text-center"
        />
        <TransactionTableBodyCell
          :text="new Intl.NumberFormat('us-US', {}).format(row.amount)"
          :hint="row.currency"
          class="w-0 text-right"
        />
      </tr>
    </tbody>
  </BaseTable>
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

const emit = defineEmits(["sort", "click:row"]);
</script>
