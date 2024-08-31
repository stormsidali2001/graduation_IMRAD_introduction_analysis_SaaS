import { json2csv } from "json-2-csv";
export const convertJsonToCsv = (data: Object[]) => {
  const csv = json2csv(data, {});
  return csv;
};
