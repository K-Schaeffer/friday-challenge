<template>
  <div :class="{ 'cursor-wait animate-pulse opacity-10': isLoading }">
    <h1 class="text-zinc-900 font-bold pb-5">Transactions</h1>
    <TransactionSearchInput
      v-model="currentSearch"
      class="pb-3"
      :is-disabled="isLoading"
    />
    <TransactionTable
      :head-cells="headCells"
      :body-rows="currentBodyRows"
      @sort="handleSort"
      @click:row="(id) => $router.push(`transaction/${id}`)"
      @scroll="handleScroll"
    />
    <span
      v-show="!isLoading"
      class="mt-2 flex justify-end items-end text-xs text-zinc-600 text-right"
    >
      <span class="font-bold mr-1">{{ currentBodyRows.length }}</span>
      transactions found
    </span>
  </div>
</template>

<script setup>
import transactionsGql from "~/queries/transactions.gql";

const headCells = reactive([
  { text: "Account", id: "account" },
  { text: "Bank", id: "bank" },
  { text: "Reference", id: "reference" },
  { text: "Category", id: "category" },
  { text: "Date", id: "date" },
  { text: "Amount", id: "amount", isSortable: true, isSorting: "" },
]);
const bodyRows = reactive([]);

const currentSearch = ref("");
const isLoading = ref(true);

const fetchTransactions = (offset = 0) => {
  // TODO: Fix nuxt apollo lint
  // eslint-disable-next-line no-undef
  const query = useQuery(transactionsGql, {
    limit: 50,
    offset,
  });

  query.onResult((result) => {
    bodyRows.push(...result.data.transactions);
    isLoading.value = false;
  });
};

onMounted(() => {
  fetchTransactions();
});

const currentBodyRows = computed(() => {
  const headCellSorting = headCells.find((cell) => cell.isSortable);
  let sortedBodyRows;

  if (headCellSorting.isSorting) {
    sortedBodyRows = bodyRows;

    headCellSorting.isSorting === "DESC"
      ? sortedBodyRows.sort(
          (a, b) => b[headCellSorting.id] - a[headCellSorting.id]
        )
      : sortedBodyRows.sort(
          (a, b) => a[headCellSorting.id] - b[headCellSorting.id]
        );
  }

  if (!currentSearch.value.length) {
    return sortedBodyRows || bodyRows;
  }

  return bodyRows.filter((row) => {
    const searchableValues = [
      row.account.name.toLowerCase(),
      row.account.bank.toLowerCase(),
      row.reference.toLowerCase(),
      row.category.name.toLowerCase(),
      new Date(row.date).toLocaleDateString("us-US"),
      new Intl.NumberFormat("us-US", {}).format(row.amount),
      row.currency.toLowerCase(),
    ];

    return searchableValues.find((value) =>
      value.includes(currentSearch.value.toLowerCase())
    );
  });
});

const handleScroll = (event) => {
  const { scrollTop, scrollTopMax } = event.target;

  if (
    scrollTop < scrollTopMax ||
    currentSearch.value.length ||
    headCells.find((cell) => cell.isSortable && cell.isSorting)
  ) {
    return;
  }

  fetchTransactions(bodyRows.length);
};

const handleSort = (cellId) => {
  const selectedCell = headCells.find((cell) => cell.id === cellId);

  selectedCell.isSorting = !selectedCell.isSorting
    ? "DESC"
    : selectedCell.isSorting === "ASC"
    ? "DESC"
    : "ASC";
};
</script>
