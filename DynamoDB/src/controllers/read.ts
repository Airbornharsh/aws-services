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

export const getItem: RequestHandler = (req, res) => {
  try {
    const { tableName, partitionKey, sortKey } = req.params;
    if (!tableName) {
      throw new Error("Table name is required");
    }
    if (!partitionKey) {
      throw new Error("Partition key is required");
    }
    if (!sortKey) {
      throw new Error("Sort key is required");
    }
    const data: { [key: string]: Table } = parseData();
    if (!Object.keys(data).includes(tableName)) {
      throw new Error("Table does not exist");
    }
    if (!data[tableName].items) {
      throw new Error("Table does not have any items");
    }
    const item = data[tableName].items?.find(
      (item) =>
        item[data[tableName].partitionKey.name] === partitionKey &&
        item[data[tableName].sortKey.name] === sortKey
    );
    return res.json({ item });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
};

export const queryItems: RequestHandler = (req, res) => {
  try {
    const { tableName } = req.params;
    const query = req.query;
    if (!tableName) {
      throw new Error("Table name is required");
    }
    const data: { [key: string]: Table } = parseData();
    if (!Object.keys(data).includes(tableName)) {
      throw new Error("Table does not exist");
    }
    if (!data[tableName].items) {
      throw new Error("Table does not have any items");
    }
    const queryKeys = Object.keys(query);

    const items = data[tableName].items?.filter((item) => {
      let isValid = true;
      queryKeys.forEach((key) => {
        data[tableName].attributes?.forEach((attribute) => {
          if (attribute.name === key) {
            if (attribute.type === "string") {
              if (item[key] !== query[key]) {
                isValid = false;
              }
            }
            if (attribute.type === "number") {
              if (item[key] !== Number(query[key])) {
                isValid = false;
              }
            }
            if (attribute.type === "boolean") {
              if (item[key] !== Boolean(query[key])) {
                isValid = false;
              }
            }
          }
        });
      });
      return isValid;
    });

    return res.json({ items });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
};
