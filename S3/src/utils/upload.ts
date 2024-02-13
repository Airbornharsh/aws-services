import fs from "fs";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filePath =
      req.query.path && typeof req.query.path == "string" ? req.query.path : "";
    const filePaths = filePath.split("/");
    let temp = "Buckets/" + req.params.bucketId + "/";
    filePaths.forEach((folder) => {
      if (folder) {
        if (!fs.existsSync(temp + folder)) {
          fs.mkdirSync(temp + folder);
        }
        temp += folder + "/";
      }
    });
    const destinationFolder = "Buckets/" + req.params.bucketId + "/" + filePath;
    console.log(destinationFolder);
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
