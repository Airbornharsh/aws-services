import { Router } from "express";
import { createTable, updateTable } from "./controllers/cont1";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});
routes.post("/create-table", createTable);
routes.put("/update-table/:tableName", updateTable);

export default routes;
