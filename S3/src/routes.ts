import { Router } from "express";
import { createBucket } from "./controllers/cont1";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});
routes.post("/create-bucket", createBucket);

export default routes;
