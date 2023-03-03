<template>
  <div :class="{ 'cursor-wait animate-pulse opacity-10': isLoading }">
    <h1 class="text-zinc-900 font-bold pb-4">
      Transaction Details - Change Category
    </h1>
    <div class="pb-6 px-6 grid grid-cols-2 gap-x-8">
      <CategoryAutocompleteInput
        v-model="selectedCategory.name"
        :categories="currentCategories"
        :is-disabled="isLoading"
        @update:model-value="updateSelectedCategory"
      />
      <CategoryColorInput
        v-model="selectedCategory.color"
        :is-disabled="isLoading || !canUpdateColor"
        class="max-w-[100px]"
      />
    </div>
    <div class="flex">
      <NuxtLink
        to="/"
        tabindex="3"
        class="text-sm mr-4 text-zinc-600 font-bold underline decoration-zinc-600 hover:text-zinc-900 hover:decoration-zinc-900 focus:outline-1"
      >
        Back to table
      </NuxtLink>
      <button
        :disabled="!hasEdited"
        :class="{
          'cursor-not-allowed text-zinc-300 decoration-zinc-300 hover:decoration-zinc-300 hover:text-zinc-200 ':
            !hasEdited,
        }"
        tabindex="4"
        class="text-sm text-zinc-600 font-bold underline decoration-zinc-600 hover:text-zinc-900 hover:decoration-zinc-900 focus:outline-1"
        @click="handleSaveButtonClick"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup>
import transactionGql from "~/queries/transaction.gql";
import categoriesGql from "~/queries/categories.gql";
import updateTransactionCategoryGql from "~/queries/updateTransactionCategory.gql";
import addCategoryGql from "~/queries/addCategory.gql";

const selectedCategory = reactive({
  id: "",
  name: "",
  color: "",
});
const categories = reactive([]);

const isLoading = ref(true);
const hasEdited = ref(false);

const router = useRouter();
const transactionId = useRoute().params.id;

// TODO: Fix nuxt apollo lint
onMounted(() => {
  // eslint-disable-next-line no-undef
  const getCurrentTransaction = useQuery(transactionGql, {
    id: transactionId,
  });

  getCurrentTransaction.onResult((result) => {
    const { id, name, color } = result.data.transaction.category;

    selectedCategory.id = id;
    selectedCategory.name = name;
    selectedCategory.color = `#${color}`;
  });

  // eslint-disable-next-line no-undef
  const getCategories = useQuery(categoriesGql);

  getCategories.onResult((result) => {
    categories.push(...result.data.categories);
  });

  isLoading.value = false;
});

const canUpdateColor = computed(() => {
  return !selectedCategory.id.length;
});

const currentCategories = computed(() => {
  return categories.filter((category) => category.id !== selectedCategory.id);
});

const updateSelectedCategory = (value) => {
  hasEdited.value = true;

  const selectedCategoryData = categories.find(
    (category) => category.id === value
  );

  if (!selectedCategoryData) {
    selectedCategory.name = value;
    selectedCategory.id = "";
    selectedCategory.color = "";

    return;
  }

  selectedCategory.id = selectedCategoryData.id;
  selectedCategory.name = selectedCategoryData.name;
  selectedCategory.color = `#${selectedCategoryData.color}`;
};

const handleSaveButtonClick = async () => {
  if (!selectedCategory.id) {
    await createNewCategory();

    return;
  }

  updateTransactionCategoryAndRedirect();
};

const createNewCategory = () => {
  const variables = {
    categoryContent: {
      name: selectedCategory.name,
      color: selectedCategory.color
        ? selectedCategory.color.replace("#", "")
        : "",
    },
  };

  // eslint-disable-next-line no-undef
  const { mutate, onDone } = useMutation(addCategoryGql, { variables });

  mutate();

  onDone((result) => {
    selectedCategory.id = result.data.addCategory.id;

    // Needs to be here to make sure that the new category is already created
    updateTransactionCategoryAndRedirect();
  });
};

const updateTransactionCategoryAndRedirect = () => {
  const variables = {
    id: transactionId,
    categoryId: selectedCategory.id,
  };

  // eslint-disable-next-line no-undef
  const { mutate, onDone } = useMutation(updateTransactionCategoryGql, {
    variables,
  });

  mutate();
  onDone(() => router.push("/"));
};
</script>
