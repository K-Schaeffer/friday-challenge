import fs from 'fs';

import { parseCSV } from "../utils";

const file = "./prisma/seeds/Category/categories.csv";
let data: Category[] = [];

export interface Category {
  id: string;
  name: string;
  color?: string;
}

export function getCategories() {
  return new Promise<Category[]>((resolve, reject) => {
    fs.createReadStream(file)
      .pipe(parseCSV())
      .on("data", (row: Array<string>) => {
        const [id, name, color] = row;

        data.push({ id, name, color });
      })
      .on("end", () => resolve(data))
      .on("error", (error: Error) => {
        console.error(error.message);
        
        reject(error.message);
      });
  });
}
