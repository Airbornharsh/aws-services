import { Harsh_S3 } from "harsh-aws-sdk";
import fs from "fs";
import path from "path";

const s3 = new Harsh_S3("harsh", "harsh");
const fileName = "index.ts";
const filePath = "src/" + fileName;
const data = fs.readFileSync(filePath);
const buffer = Buffer.from(data);
const file = new File([buffer], fileName, {
  type: "application/octet-stream",
});
s3.uploadFile(file, "59722c6f-de9e-4073-b4a7-e30a33991570", "", "test.txt");
