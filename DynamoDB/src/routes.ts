import { Router } from "express";
import {
  createTable,
  deleteItem,
  putItem,
  updateItem,
} from "./controllers/write";
import { getItem, getItems, queryItems } from "./controllers/read";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});
routes.post("/create-table", createTable);
// routes.put("/update-table/:tableName", updateTable);
routes.put("/put-item/:tableName", putItem);
routes.patch("/update-item/:tableName", updateItem);
routes.get("/items/:tableName/:partitionKey", getItems);
routes.get("/item/:tableName/:partitionKey/:sortKey", getItem);
routes.get("/query/:tableName", queryItems);
routes.delete("/:tableName/:partitionKey/:sortKey", deleteItem);

export default routes;
