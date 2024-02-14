import { RequestHandler } from "express";
import { Table } from "../types/table";
import { parseData } from "../utils/parser";

export const getItems: RequestHandler = (req, res) => {
  try {
    const { tableName, partitionKey } = req.params;
    if (!tableName) {
      throw new Error("Table name is required");
    }
    if (!partitionKey) {
      throw new Error("Partition key is required");
    }
    const data: { [key: string]: Table } = parseData();
    if (!Object.keys(data).includes(tableName)) {
      throw new Error("Table does not exist");
    }
    if (!data[tableName].items) {
      throw new Error("Table does not have any items");
    }
    const items = data[tableName].items?.filter(
      (item) => item[data[tableName].partitionKey.name] === partitionKey
    );
    return res.json({ items });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
};
