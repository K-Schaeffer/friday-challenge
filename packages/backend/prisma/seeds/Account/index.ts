import fs from 'fs';

import { parseCSV } from "../utils";

const file = "./prisma/seeds/Account/accounts.csv";
let data: Account[] = [];

export interface Account {
  id: string;
  name: string;
  bank: string;
}

export function getAccounts() {
  return new Promise<Account[]>((resolve, reject) => {
    fs.createReadStream(file)
      .pipe(parseCSV())
      .on("data", (row: Array<string>) => {
        const [id, name, bank] = row;

        data.push({ id, name, bank });
      })
      .on("end", () => resolve(data))
      .on("error", (error: Error) => {
        console.error(error.message);

        reject(error.message);
      });
  });
}
