import fs from "fs";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filePath =
      req.query.path && typeof req.query.path == "string" ? req.query.path : "";
    const filePaths = filePath.split("/");
    if (!fs.existsSync("buckets")) {
      fs.mkdirSync("buckets");
    }
    let temp = "buckets/" + req.params.bucketId + "/";
    filePaths.forEach((folder) => {
      if (folder) {
        if (!fs.existsSync(temp + folder)) {
          fs.mkdirSync(temp + folder);
        }
        temp += folder + "/";
      }
    });
    const destinationFolder = "buckets/" + req.params.bucketId + "/" + filePath;
    cb(null, destinationFolder);
  },
  filename: function (req, file, cb) {
    const filename =
      req.query.filename && typeof req.query.filename === "string"
        ? req.query.filename
        : file.originalname;
    cb(null, filename);
  },
});

export const upload = multer({ storage: storage });

const lambdaStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("buckets")) {
      fs.mkdirSync("buckets");
    }
    if (!fs.existsSync("buckets/lambda")) {
      fs.mkdirSync("buckets/lambda");
    }
    console.log(file);
    const type = file.originalname.split(".").pop();
    if (type === "js") {
      if (!fs.existsSync("buckets/lambda/javascript")) {
        fs.mkdirSync("buckets/lambda/javascript");
      }
      const destinationFolder = "buckets/lambda/javascript/";
      cb(null, destinationFolder);
    } else {
      throw new Error("Invalid file type");
    }
  },
  filename: function (req, file, cb) {
    const type = file.originalname.split(".").pop();
    if (type === "js") {
      const lambdaId = "lambda-" + uuidv4();
      const filename = lambdaId + ".js";
      cb(null, filename);
    } else {
      throw new Error("Invalid file type");
    }
  },
});

export const lambdaUpload = multer({ storage: lambdaStorage });
