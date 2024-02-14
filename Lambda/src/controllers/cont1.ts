import { RequestHandler } from "express";
import fs from "fs";
import { exec } from "child_process";

export const executionHandler: RequestHandler = async (req, res) => {
  try {
    if (!fs.existsSync("temp")) {
      fs.mkdirSync("temp");
    }
    const lambda = req.query.lambda;
    if (!lambda) {
      throw new Error("No lambda Provided");
    }
    if (typeof lambda !== "string") {
      throw new Error("Invalid Lambda Name Provided");
    }
    if (
      lambda.includes("/") ||
      lambda.includes("\\") ||
      lambda.includes("..") ||
      lambda.includes("~") ||
      lambda.includes(" ")
    ) {
      throw new Error("Invalid Lambda Name Provided");
    }
    const type = lambda.split(".").pop();
    if (type !== "js") {
      throw new Error("Invalid Lambda Type");
    } else {
      if (!fs.existsSync("temp/javascript")) {
        fs.mkdirSync("temp/javascript");
      }
    }
    const lambdaPath = `temp/javascript/${lambda}`;
    const s3Res = await fetch(
      `http://localhost:4001/api/get-lambda?lambda=${lambda}`,
      {
        method: "GET",
      }
    );
    if (s3Res.status !== 200) {
      throw new Error("Lambda Not Found");
    }
    const s3Data = await s3Res.json();
    if (lambda !== s3Data.file.name) {
      throw new Error("Lambda Not Found");
    }
    const lambdaData = s3Data.file.data;
    if (!lambdaData) {
      throw new Error("Lambda Not Found");
    }
    if (lambdaData.includes("..") || lambdaData.includes("~")) {
      throw new Error("Bad Practice");
    }
    fs.writeFileSync(lambdaPath, lambdaData);
    if (!fs.existsSync(lambdaPath)) {
      throw new Error("Lambda Not Found");
    }
    const PromiseRes: {
      output?: string;
      error?: Error;
    } = await new Promise((resolve, reject) => {
      exec(`node ${lambdaPath}`, (error, output) => {
        if (error) {
          return reject({ error });
        }
        return resolve({ output });
      });
    });
    fs.unlinkSync(lambdaPath);
    return res.json({ message: "Output", output: PromiseRes.output });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({
      message: e.message,
    });
  }
};
