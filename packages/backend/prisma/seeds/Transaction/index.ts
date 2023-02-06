import fs from 'fs';

import { parseCSV } from "../utils";

const file = "./prisma/seeds/Transaction/transactions.csv";
let data: Transaction[] = [];

export interface Transaction {
  id: string,
  accountId: string,
  categoryId: string,
  reference?: string,
  amount: number,
  currency: string,
  date: string,
}

export function getTransactions() {
  return new Promise<Transaction[]>((resolve, reject) => {
    fs.createReadStream(file)
      .pipe(parseCSV())
      .on("data", function (row: Array<string>) {
        const [id, accountId, categoryId, reference, amount, currency, date] = row;
      
          // FIXME: FK error.
          data.push({
            id,
            accountId,
            categoryId: categoryId || '', // Workaround to type error on createMany.
            reference,
            amount: parseFloat(amount),
            currency: currency,
            date: new Date(date).toISOString()
          });
      })
      .on("end", () => resolve(data))
      .on("error", function (error: Error) {
        console.error(error.message);

        reject(error.message);
      });
  });
}
