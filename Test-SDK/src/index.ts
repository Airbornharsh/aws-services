import { Harsh_S3 } from "harsh-aws-sdk";
import fs from "fs";
import path from "path";

const s3 = new Harsh_S3("harsh", "harsh");
const bucketId = "59722c6f-de9e-4073-b4a7-e30a33991570";

const createBucket = async () => {
  const { bucketId, message } = await s3.createBucket();
  console.log(bucketId, message);
};

const uploadFile = async () => {
  const fileName = "index.ts";
  const filePath = "src/" + fileName;
  const data = fs.readFileSync(filePath);
  const buffer = Buffer.from(data);
  const file = new File([buffer], fileName, {
    type: "application/octet-stream",
  });
  const { url, message } = await s3.uploadFile(file, bucketId, "", "test.txt");
  console.log(url, message);
};

const getAllFiles = async () => {
  const { files, message } = await s3.getAllFiles(bucketId);
  console.log(files);
};

const getFileUrl = async () => {
  const { url } = await s3.getFileUrl(bucketId, "test.txt");
  console.log(url);
};

// const downloadFile = async () => {
//   await s3.downloadFile(bucketId, "test.txt");
// };

const deleteFile = async () => {
  const { message } = await s3.deleteFile(bucketId, "test.txt");
  console.log(message);
};

deleteFile();
