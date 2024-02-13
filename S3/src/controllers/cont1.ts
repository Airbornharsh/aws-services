import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import getAllFiles from "../utils/getAllFiles";
import path from "path";

export const createBucket: RequestHandler = async (req, res) => {
  try {
    const id = uuidv4();

    fs.mkdirSync(`Buckets/${id}`);

    return res.status(200).json({
      bucketId: id,
      message: "Bucket Created",
    });
  } catch (e: any) {
    console.error(e);
    return res.status(200).json({
      message: e.message,
    });
  }
};

export const addFiles: RequestHandler = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Files Added",
    });
  } catch (e: any) {
    console.error(e);
    return res.status(200).json({
      message: e.message,
    });
  }
};

export const getFiles: RequestHandler = async (req, res) => {
  try {
    const files = getAllFiles(`Buckets/${req.params.bucketId}`);

    const fileDatas = files.map((file) => {
      const fileData = fs.readFileSync(file);
      return {
        file: file.split("/").slice(2).join("/"),
        fileName: file.split("/").pop(),
        data: fileData.toString("utf-8"),
      };
    });

    return res.status(200).json({
      files: fileDatas,
      message: "Files Fetched",
    });
  } catch (e: any) {
    console.error(e);
    return res.status(200).json({
      message: e.message,
    });
  }
};
