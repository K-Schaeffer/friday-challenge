<template>
  <div>
    <label for="search" class="font-semibold text-sm text-zinc-400 block pb-1">
      Search
    </label>
    <div
      class="flex items-center border border-zinc-400 rounded hover:border-zinc-900 focus-within:border-zinc-900"
    >
      <svg
        aria-hidden="true"
        fill="none"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        class="stroke-zinc-400 stroke-2 ml-2"
      >
        <path
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
      <input
        type="text"
        name="search"
        placeholder="Search by bank, account, reference, category, date, amount, currency..."
        class="p-2 w-full text-md text-zinc-600 placeholder-zinc-400 focus:outline-none"
      />
    </div>
  </div>
</template>
