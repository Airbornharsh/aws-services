import { Router } from "express";
import { addFiles, createBucket, getFiles } from "./controllers/cont1";
import { upload } from "./utils/upload";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});
routes.post("/create-bucket", createBucket);
routes.put("/add-files/:bucketId", upload.single("file"), addFiles);
routes.get("/get-files/:bucketId", upload.single("file"), getFiles);

export default routes;
