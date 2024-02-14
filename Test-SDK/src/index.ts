import { Harsh_S3 } from "harsh-aws-sdk";
import fs from "fs";
import path from "path";
import { FileType } from "harsh-aws-sdk/out/types/FileType";

const s3 = new Harsh_S3("harsh", "harsh");
const bucketId = "59722c6f-de9e-4073-b4a7-e30a33991570";

let mainFile: FileType;
let mainFiles: FileType[];

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
  const uploadedFile = await s3.uploadFile(file, bucketId, "", "test.txt");
  mainFile = uploadedFile;
};

const getAllFiles = async () => {
  const files = await s3.getAllFiles(bucketId);
  mainFiles = files;
};

const getFileUrl = async () => {
  const { url } = await s3.getFileUrl(bucketId, "test.txt");
  console.log(url);
};

// const downloadFile = async () => {
//   await s3.downloadFile(bucketId, "test.txt");
// };

const deleteFile = async (data: FileType | string) => {
  const { message } = await s3.deleteFile(bucketId, data);
  console.log(message);
};

const main = async () => {
  // await getAllFiles();
  // await deleteFile(mainFiles[0]);
  // await uploadFile();
};

main();
