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
