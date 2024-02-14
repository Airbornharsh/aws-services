import { Harsh_Lambda } from "harsh-aws-sdk";
import fs from "fs";

const Lambda = new Harsh_Lambda("harsh", "harsh");

export const uploadFunction = async () => {
  const fileName = "test.js";
  const filePath = "" + fileName;
  const data = fs.readFileSync(filePath);
  const buffer = Buffer.from(data);
  const file = new File([buffer], fileName, {
    type: "application/octet-stream",
  });
  const res = await Lambda.uploadFile(file);
  console.log(res.lambda);
};

export const uploadFunctionData = async () => {
  const data = "console.log('Hello World')";
  const res = await Lambda.uploadData(data);
  console.log(res.lambda);
};
