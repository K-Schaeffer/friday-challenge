import { PrismaClient } from "@prisma/client";

import { getAllSeeds, Seed } from './seeds'

const prisma = new PrismaClient();

async function populateAllDatabase({ accounts, categories, transactions }: Seed) {
  const populateAccounts = prisma.account.createMany({
    data: accounts
  });

  const populateCategory = prisma.category.createMany({
    data: categories
  });

  const populateTransaction = prisma.transaction.createMany({
    data: transactions
  });

  await prisma.$transaction([
    populateAccounts,
    populateCategory,
    populateTransaction,
  ]);
}

async function main() {
  console.info('Starting to read seeds...')
  const seeds = await getAllSeeds();
  console.info('Seeds loaded!')

  console.info('Starting to populate database...')
  await populateAllDatabase(seeds)
  console.info('Database populated!')
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
