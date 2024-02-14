import { Router } from "express";
import { executionHandler } from "./controllers/cont1";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});
routes.post("/exec", executionHandler);

export default routes;
