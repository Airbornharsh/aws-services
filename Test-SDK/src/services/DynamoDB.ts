import { Harsh_DynamoDB } from "harsh-aws-sdk";

const db = new Harsh_DynamoDB("harsh", "harsh");

export const createTable = async () => {
  await db.createTable("users", "id", "email", [
    {
      name: "age",
      type: "number",
    },
  ]);
};

export const putItem = async () => {
  try {
    await db.putItem("users", {
      id: "2",
      email: "harshkeshri@gmail.com",
      age: 25,
    });
  } catch (e) {
    console.error(e);
  }
};

export const updateItem = async () => {
  await db.updateItem("users", {
    id: "1",
    email: "harsh@gmail.com",
    age: 26,
  });
};

export const getItems = async () => {
  const data = await db.getItems("users", "1");
  console.log(data);
};

export const getItem = async () => {
  const data = await db.getItem("users", "1", "harsh@gmail.com");
  console.log(data);
};

export const queryItems = async () => {
  const data = await db.queryItems("users", {
    age: 25,
  });
  console.log(data);
};

export const deleteItem = async () => {
  const data = await db.deleteItem("users", "1", "harsh@gmail.com");
  console.log(data);
};
