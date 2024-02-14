import { AttributeType } from "../types/DynamoDBTypes";

class Harsh_DynamoDB {
  private key: string;
  private secret: string;
  constructor(key: string, secret: string) {
    if (!key || !secret) {
      throw new Error("Please provide key and secret");
    }
    if (key !== "harsh" && secret !== "harsh") {
      throw new Error("Invalid key or secret");
    }
    this.key = key;
    this.secret = secret;
  }

  async createTable(
    tableName: string,
    partitionKey: string,
    sortKey: string,
    attributes: AttributeType[]
  ) {
    try {
      if (!tableName || !partitionKey || !sortKey) {
        throw new Error("Table name,partition key and sort key are required");
      }
      if (attributes.length === 0) {
        throw new Error("Attributes are required");
      }
      const data = await fetch("http://localhost:4003/api/create-table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tableName, partitionKey, sortKey, attributes }),
      });
      await data.json();
      return { message: `Table ${tableName} created` };
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export { Harsh_DynamoDB };
