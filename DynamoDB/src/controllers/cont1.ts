import { RequestHandler } from "express";
import fs from "fs";
import { parseData, writeData } from "../utils/parser";
import { Table } from "../types/table";

export const createTable: RequestHandler = (req, res) => {
  try {
    const { tableName, partitionKey, sortKey, attributes } = req.body;
    if (!tableName) {
      return res.status(400).json({ message: "Table name is required" });
    }
    if (!partitionKey.name || !partitionKey.type) {
      return res.status(400).json({ message: "Partition key is required" });
    }
    if (!sortKey.name || !sortKey.type) {
      return res.status(400).json({ message: "Sort key is required" });
    }
    const data: { [key: string]: Table } = parseData();

    if (Object.keys(data).includes(tableName)) {
      return res.status(400).json({ message: "Table already exists" });
    }
    data[tableName] = {
      partitionKey: {
        name: partitionKey.name,
        type: partitionKey.type,
      },
      sortKey: {
        name: sortKey.name,
        type: sortKey.type,
      },
      attributes: attributes
        ? attributes.length
          ? attributes.map((att: { type: string; name: string }) => {
              if (!att.type || !att.name) {
                return res
                  .status(400)
                  .json({ message: "Attribute type and name are required" });
              }
              return {
                type: att.type,
                name: att.name,
              };
            })
          : []
        : [],
      items: [],
    };

    writeData(data);
    return res.json({ message: "Table created successfully" });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }
};

export const updateTable: RequestHandler = (req, res) => {
  try {
    const { tableName } = req.params;
    const { attributes } = req.body;
    if (!tableName) {
      return res.status(400).json({ message: "Table name is required" });
    }
    const data: { [key: string]: Table } = parseData();
    if (!Object.keys(data).includes(tableName)) {
      return res.status(400).json({ message: "Table does not exist" });
    }
    if (!attributes) {
      return res.status(400).json({ message: "Attributes are required" });
    }
    if (!attributes.length) {
      return res.status(400).json({ message: "Attributes are required" });
    }
    const mergedMap = new Map();
    data[tableName].attributes.forEach((item: { name: string; type: string }) =>
      mergedMap.set(item.name, { type: item.type, name: item.name })
    );
    attributes.forEach((item: { name: string; type: string }) => {
      if (mergedMap.has(item.name)) {
        const existingItem = mergedMap.get(item.name);
        existingItem.type = item.type;
      } else {
        mergedMap.set(item.name, { type: item.type, name: item.name });
      }
    });
    const mergedArray: {
      type: string;
      name: string;
    }[] = Array.from(mergedMap.values());
    data[tableName].attributes = mergedArray;
    writeData(data);
    return res.json({ message: "Table updated successfully" });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }
};

export const addItem: RequestHandler = (req, res) => {
  try {
    const { tableName } = req.params;
    const { item } = req.body;
    if (!tableName) {
      throw new Error("Table name is required");
    }
    if (!item) {
      throw new Error("Item is required");
    }
    const data: { [key: string]: Table } = parseData();
    if (!item[data[tableName].partitionKey.name]) {
      throw new Error("Partition key is required in item");
    }
    if (!item[data[tableName].sortKey.name]) {
      throw new Error("Sort key is required in item");
    }
    if (!Object.keys(data).includes(tableName)) {
      throw new Error("Table does not exist");
    }
    if (!data[tableName].items) {
      data[tableName].items = [];
    }
    if (data[tableName].partitionKey.type === "number") {
      if (typeof item[data[tableName].partitionKey.name] !== "number") {
        throw new Error(
          `${data[tableName].partitionKey.name} should be of type number`
        );
      }
    }
    if (data[tableName].sortKey.type === "number") {
      if (typeof item[data[tableName].sortKey.name] !== "number") {
        throw new Error(
          `${data[tableName].sortKey.name} should be of type number`
        );
      }
    }
    if (data[tableName].partitionKey.type === "string") {
      if (typeof item[data[tableName].partitionKey.name] !== "string") {
        throw new Error(
          `${data[tableName].partitionKey.name} should be of type string`
        );
      }
    }
    if (data[tableName].sortKey.type === "string") {
      if (typeof item[data[tableName].sortKey.name] !== "string") {
        throw new Error(
          `${data[tableName].sortKey.name} should be of type string`
        );
      }
    }
    const newItem: {
      [key: string]: string | number | boolean | string[] | number[];
    } = {
      [data[tableName].partitionKey.name]:
        item[data[tableName].partitionKey.name],
      [data[tableName].sortKey.name]: item[data[tableName].sortKey.name],
    };
    data[tableName].items?.forEach((existingItem) => {
      if (
        existingItem[data[tableName].partitionKey.name] ===
          item[data[tableName].partitionKey.name] &&
        existingItem[data[tableName].sortKey.name] ===
          item[data[tableName].sortKey.name]
      ) {
        throw new Error("Item already exists");
      }
    });
    data[tableName].attributes.forEach(
      (att: { name: string; type: string }) => {
        if (!item[att.name]) {
          throw new Error(`${att.name} is required in item`);
        }
        if (att.type === "number") {
          if (typeof item[att.name] !== "number") {
            throw new Error(`${att.name} should be of type number`);
          }
        } else if (att.type === "string") {
          if (typeof item[att.name] !== "string") {
            throw new Error(`${att.name} should be of type string`);
          }
        } else if (att.type === "boolean") {
          if (typeof item[att.name] !== "boolean") {
            throw new Error(`${att.name} should be of type boolean`);
          }
        } else if (att.type === "string[]") {
          if (!Array.isArray(item[att.name])) {
            throw new Error(`${att.name} should be of type string[]`);
          }
        } else if (att.type === "number[]") {
          if (!Array.isArray(item[att.name])) {
            throw new Error(`${att.name} should be of type number[]`);
          }
        } else {
          throw new Error(`${att.type} is not a valid type`);
        }
        newItem[att.name] = item[att.name];
      }
    );
    data[tableName].items?.push(newItem);
    writeData(data);
    return res.json({ message: "Item added successfully" });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
};
