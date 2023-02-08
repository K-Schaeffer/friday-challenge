<template>
  <div>
    <h1 class="text-zinc-900 font-bold pb-5">Transactions</h1>
    <my-transaction-search-input class="pb-3" />
    <div class="block max-h-[75vh] overflow-hidden overflow-y-scroll">
      <my-transaction-table />
    </div>
  </div>
</template>
