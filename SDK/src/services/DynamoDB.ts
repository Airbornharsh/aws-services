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
        body: JSON.stringify({
          tableName,
          partitionKey: {
            name: partitionKey,
            type: "string",
          },
          sortKey: {
            name: sortKey,
            type: "string",
          },
          attributes,
        }),
      });
      await data.json();
      return { message: `Table ${tableName} created` };
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async putItem(tableName: string, item: { [key: string]: any }) {
    try {
      if (!tableName) {
        throw new Error("Table name is required");
      }
      if (!item) {
        throw new Error("Item is required");
      }
      const data = await fetch(
        `http://localhost:4003/api/put-item/${tableName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );
      const parsedData = await data.json();
      return {
        message: `Item added to ${tableName}`,
        item: parsedData.item as {
          [key: string]: any;
        },
      };
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async updateItem(
    tableName: string,
    partitionKey: string,
    sortKey: string,
    item: { [key: string]: any }
  ) {
    try {
      if (!tableName) {
        throw new Error("Table name is required");
      }
      if (!partitionKey) {
        throw new Error("Partition key is required");
      }
      if (!sortKey) {
        throw new Error("Sort key is required");
      }
      if (!item) {
        throw new Error("Item is required");
      }
      const data = await fetch(
        `http://localhost:4003/api/update-item/${tableName}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item: {
              partitionKey,
              sortKey,
              ...item,
            },
          }),
        }
      );
      const parsedData = await data.json();
      return {
        message: `Item updated in ${tableName}`,
        item: parsedData.item as {
          [key: string]: any;
        },
      };
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async getItems(tableName: string, partitionKey: string) {
    try {
      if (!tableName) {
        throw new Error("Table name is required");
      }
      if (!partitionKey) {
        throw new Error("Partition key is required");
      }
      const data = await fetch(
        `http://localhost:4003/api/items/${tableName}/${partitionKey}`
      );
      const parsedData: {
        items: { [key: string]: any }[];
      } = await data.json();
      return parsedData;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async getItem(tableName: string, partitionKey: string, sortKey: string) {
    try {
      if (!tableName) {
        throw new Error("Table name is required");
      }
      if (!partitionKey) {
        throw new Error("Partition key is required");
      }
      if (!sortKey) {
        throw new Error("Sort key is required");
      }
      const data = await fetch(
        `http://localhost:4003/api/item/${tableName}/${partitionKey}/${sortKey}`
      );
      const parsedData: {
        item: { [key: string]: any };
      } = await data.json();
      return parsedData;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async queryItems(tableName: string, query: { [key: string]: any }) {
    try {
      if (!tableName) {
        throw new Error("Table name is required");
      }
      const data = await fetch(
        `http://localhost:4003/api/query/${tableName}?${new URLSearchParams(
          query
        )}`
      );
      const parsedData: {
        items: { [key: string]: any }[];
      } = await data.json();
      return parsedData;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export { Harsh_DynamoDB };
