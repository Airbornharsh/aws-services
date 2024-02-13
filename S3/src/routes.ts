import { Router } from "express";
import {
  addFiles,
  createBucket,
  downloadFile,
  getFiles,
} from "./controllers/cont1";
import { upload } from "./utils/upload";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});
routes.post("/create-bucket", createBucket);
routes.put("/add-files/:bucketId", upload.single("file"), addFiles);
routes.get("/get-files/:bucketId", getFiles);
routes.get("/download-file/:bucketId", downloadFile);

export default routes;
