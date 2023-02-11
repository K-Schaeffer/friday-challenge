<template>
  <div :class="{ 'animate-pulse opacity-10': isLoading }">
    <h1 class="text-zinc-900 font-bold pb-5">Transactions</h1>
    <my-transaction-search-input class="pb-3" />
    <div
      class="block max-h-[75vh] overflow-hidden overflow-y-scroll"
      @scroll="handleScroll"
    >
      <my-transaction-table
        :head-cells="headCells"
        :body-rows="bodyRows"
        @sort="handleSort"
      />
    </div>
    <span
      v-show="!isLoading"
      class="mt-2 flex justify-end items-end text-xs text-zinc-600 text-right"
    >
      <span class="font-bold mr-1">{{ bodyRows.length }}</span>
      transactions found
    </span>
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

const bodyRows = reactive([]);

let currentQuery = reactive();

const isLoading = ref(true);

onMounted(() => {
  // TODO: Fix nuxt apollo lint
  // eslint-disable-next-line no-undef
  currentQuery = useQuery(transactionsGql, {
    limit: 50,
    offset: 0,
  });

  currentQuery.onResult((result) => {
    bodyRows.push(...result.data.transactions);
    isLoading.value = false;
  });
});

const handleScroll = (event) => {
  const { scrollTop, scrollTopMax } = event.target;

  if (scrollTop < scrollTopMax) {
    return;
  }

  currentQuery.fetchMore({
    variables: {
      limit: 50,
      offset: currentQuery.result.value.transactions.length,
    },
    updateQuery: (_, { fetchMoreResult }) => ({
      transactions: [...fetchMoreResult.transactions],
    }),
  });
};

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
