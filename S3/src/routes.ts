import { Router } from "express";
import {
  addFiles,
  createBucket,
  deleteFile,
  downloadFile,
  getFileUrl,
  getFiles,
} from "./controllers/cont1";
import { lambdaUpload, upload } from "./utils/upload";
import { getLamdaFucntion, uploadFunction, uploadFunctionData } from "./controllers/lambda";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});
routes.put("/upload-lambda", lambdaUpload.single("file"), uploadFunction);
routes.put("/upload-lambda-data", uploadFunctionData);
routes.get("/get-lambda", getLamdaFucntion);
routes.post("/create-bucket", createBucket);
routes.put("/add-files/:bucketId", upload.single("file"), addFiles);
routes.get("/get-files/:bucketId", getFiles);
routes.get("/url/:bucketId", getFileUrl);
routes.get("/download-file/:bucketId", downloadFile);
routes.delete("/delete-file/:bucketId", deleteFile);

export default routes;
