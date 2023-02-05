import { parse } from "csv-parse";

export function parseCSV(): any {
  return parse({ delimiter: ",", from_line: 2, relax_quotes: true });
}
