import { Router } from "express";
import { addItem, createTable, updateItem } from "./controllers/cont1";
import { getItem, getItems, queryItems } from "./controllers/read";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});
routes.post("/create-table", createTable);
// routes.put("/update-table/:tableName", updateTable);
routes.put("/add-item/:tableName", addItem);
routes.patch("/update-item/:tableName", updateItem);
routes.get("/items/:tableName/:partitionKey", getItems);
routes.get("/item/:tableName/:partitionKey/:sortKey", getItem);
routes.get("/query/:tableName",queryItems)

export default routes;
