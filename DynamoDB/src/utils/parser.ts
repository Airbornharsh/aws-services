import fs from "fs";
import { Table } from "../types/table";

export const parseData = () => {
  try {
    const data = fs.readFileSync(`src/data.json`, "utf8");
    return JSON.parse(data);
  } catch (e: any) {
    console.error(e);
    return null;
  }
};

export const writeData = (data: { [key: string]: Table }) => {
  try {
    fs.writeFileSync(`src/data.json`, JSON.stringify(data, null, 2));
  } catch (e: any) {
    console.error(e);
  }
};
