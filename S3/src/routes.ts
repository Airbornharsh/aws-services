import { Router } from "express";
import {
  addFiles,
  createBucket,
  deleteFile,
  downloadFile,
  getFileUrl,
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
routes.get("/url/:bucketyId", getFileUrl);
routes.get("/download-file/:bucketId", downloadFile);
routes.delete("/delete-file/:bucketId", deleteFile);

export default routes;
