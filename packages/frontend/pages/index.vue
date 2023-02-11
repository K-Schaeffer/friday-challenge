<template>
  <div :class="{ 'animate-pulse opacity-10': isLoading }">
    <h1 class="text-zinc-900 font-bold pb-5">Transactions</h1>
    <my-transaction-search-input v-model="currentSearch" class="pb-3" />
    <div
      class="block max-h-[75vh] overflow-hidden overflow-y-scroll overflow-x-scroll"
      @scroll="handleScroll"
    >
      <my-transaction-table
        :head-cells="headCells"
        :body-rows="currentBodyRows"
        @sort="handleSort"
      />
    </div>
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
  { text: "Date", id: "date", isSortable: true, isSorting: "" },
  { text: "Amount", id: "amount", isSortable: true, isSorting: "" },
]);

const bodyRows = reactive([]);

let currentQuery = reactive();

const currentSearch = ref("");
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

const currentBodyRows = computed(() => {
  if (currentSearch.value.length === "") {
    return bodyRows;
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

  if (scrollTop < scrollTopMax || currentSearch.value.length) {
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
