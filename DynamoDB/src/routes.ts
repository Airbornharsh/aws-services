import { Router } from "express";
import { addItem, createTable, updateItem, updateTable } from "./controllers/cont1";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});
routes.post("/create-table", createTable);
// routes.put("/update-table/:tableName", updateTable);
routes.put("/add-item/:tableName", addItem);
routes.patch("/update-item/:tableName", updateItem);

export default routes;
