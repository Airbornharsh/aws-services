import { RequestHandler } from "express";
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
      fileName: file.filename,
      message: "File Uploaded",
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
    console.log(req);
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
    console.log(data);
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