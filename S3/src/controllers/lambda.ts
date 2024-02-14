import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

export const uploadFunction: RequestHandler = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "No file found",
      });
    }
    return res.status(200).json({
      lambda: file.filename,
      message: "File Uploaded",
    });
  } catch (e: any) {
    console.error(e);
    return res.status(200).json({
      message: e.message,
    });
  }
};

export const uploadFunctionData: RequestHandler = async (req, res) => {
  try {
    const { fileData } = req.body;
    if (!fileData) {
      throw new Error("No file data found");
    }
    if (typeof fileData !== "string") {
      throw new Error("Invalid file data");
    }
    if (!fs.existsSync("buckets")) {
      fs.mkdirSync("buckets");
    }
    if (!fs.existsSync("buckets/lambda")) {
      fs.mkdirSync("buckets/lambda");
    }
    if (!fs.existsSync("buckets/lambda/javascript")) {
      fs.mkdirSync("buckets/lambda/javascript");
    }
    const lambda = "lambda-" + uuidv4() + ".js";
    fs.writeFileSync(`buckets/lambda/javascript/${lambda}`, fileData);
    return res.status(200).json({
      lambda,
      message: "Data Uploaded",
    });
  } catch (e: any) {
    console.error(e);
    return res.status(200).json({
      message: e.message,
    });
  }
};

export const getLamdaFucntion: RequestHandler = async (req, res) => {
  try {
    const lambda = req.query.lambda;
    if (!lambda) {
      throw new Error("No lambda Provided");
    }
    if (typeof lambda !== "string") {
      throw new Error("Invalid Lambda Name Provided");
    }
    const type = lambda.split(".").pop();
    if (type !== "js") {
      throw new Error("Invalid Lambda Type");
    }
    const lambdaPath = `buckets/lambda/javascript/${lambda}`;
    if (!fs.existsSync(lambdaPath)) {
      throw new Error("Lambda Not Found");
    }
    const data = fs.readFileSync(lambdaPath, "utf-8");
    return res.status(200).json({
      message: "Hello World",
      file: {
        name: lambda,
        data: data,
      },
    });
  } catch (e: any) {
    console.error(e);
    return res.status(200).json({
      message: e.message,
    });
  }
};
