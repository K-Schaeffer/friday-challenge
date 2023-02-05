import { getAccounts, Account } from "./Account";
import { getCategories, Category } from "./Category";
import { getTransactions, Transaction } from "./Transaction";


export const getAllSeeds = async () => ({
  accounts: await getAccounts(),
  categories: await getCategories(),
  transactions: await getTransactions()
})
 
export interface Seed {
  accounts: Account[],
  categories: Category[],
  transactions: Transaction[],
}
