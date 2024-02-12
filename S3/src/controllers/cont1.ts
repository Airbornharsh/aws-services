import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

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
