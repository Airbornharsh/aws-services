import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import getAllFiles from "../utils/getAllFiles";
import path from "path";

export const createBucket: RequestHandler = async (req, res) => {
  try {
    const id = uuidv4();

    fs.mkdirSync(`buckets/${id}`);

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
      url: `http://localhost:4001/buckets/${req.params.bucketId}/${
        req.query.path
      }/${req.query.filename ? req.query.filename : req.file?.originalname}`,
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
    const bucketPath = `buckets/${req.params.bucketId}`;
    const files = getAllFiles(bucketPath);

    const fileDatas = files.map((file) => {
      const fileData = fs.readFileSync(file);
      return {
        file: file.split("/").slice(2).join("/"),
        fileName: file.split("/").pop(),
        url: `http://localhost:4001/${file}`,
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

export const getFileUrl: RequestHandler = async (req, res) => {
  try {
    const filePath =
      req.query.path && typeof req.query.path === "string"
        ? req.query.path
        : "";

    return res.status(200).json({
      url: `http://localhost:4001/download-file/${req.params.bucketId}?path=${filePath}`,
    });
  } catch (e: any) {
    console.error(e);
    return res.status(200).json({
      message: e.message,
    });
  }
};

export const downloadFile: RequestHandler = async (req, res) => {
  try {
    const filePath =
      req.query.path && typeof req.query.path === "string"
        ? req.query.path
        : "";

    return res.sendFile(
      path.join(
        __dirname,
        "/../../",
        `buckets/${req.params.bucketId}/`,
        filePath
      ),
      {
        headers: {
          "Content-Disposition": `attachment; filename=${filePath
            .split("/")
            .pop()}`,
        },
      }
    );
  } catch (e: any) {
    console.error(e);
    return res.status(200).json({
      message: e.message,
    });
  }
};

export const deleteFile: RequestHandler = async (req, res) => {
  try {
    const filePath =
      req.query.path && typeof req.query.path === "string"
        ? req.query.path
        : "";

    fs.unlinkSync(
      path.join(
        __dirname,
        "/../../",
        `buckets/${req.params.bucketId}/`,
        filePath
      )
    );

    return res.status(200).json({
      message: "File Deleted",
    });
  } catch (e: any) {
    console.error(e);
    return res.status(200).json({
      message: e.message,
    });
  }
};
