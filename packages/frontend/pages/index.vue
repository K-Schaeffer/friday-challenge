<template>
  <div>
    <h1 class="text-zinc-900 font-bold pb-5">Transactions</h1>
    <my-transaction-search-input class="pb-3" />
    <div class="block max-h-[75vh] overflow-hidden overflow-y-scroll">
      <my-transaction-table
        :head-cells="headCells"
        :body-rows="teste"
        @sort="handleSort"
      />
    </div>
  </div>
</template>

<script setup>
import transactionsGql from "~/queries/transactions.gql";

const headCells = reactive([
  { text: "Reference", id: "reference" },
  { text: "Category", id: "category" },
  { text: "Date", id: "date", isSortable: true, isSorting: "" },
  { text: "Amount", id: "amount", isSortable: true, isSorting: "" },
]);

const {
  data: {
    value: { transactions },
  },
} = await useAsyncQuery(transactionsGql, {
  limit: 50,
  offset: 0,
});

const teste = [...transactions];

const handleSort = (cellId) => {
  const selectedCell = headCells.find((cell) => cell.id === cellId);

  selectedCell.isSorting =
    selectedCell.isSorting === ""
      ? "DESC"
      : selectedCell.isSorting === "ASC"
      ? ""
      : "ASC";
};
</script>
