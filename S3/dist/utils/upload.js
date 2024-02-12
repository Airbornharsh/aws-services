"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const filePath = req.headers.path && typeof req.headers.path == "string"
            ? req.headers.path
            : "";
        const filePaths = filePath.split("/");
        let temp = "Buckets/" + req.params.bucketId + "/";
        filePaths.forEach((folder) => {
            if (folder) {
                if (!fs_1.default.existsSync(temp + folder)) {
                    fs_1.default.mkdirSync(temp + folder);
                    temp += folder + "/";
                }
            }
        });
        const destinationFolder = "Buckets/" + req.params.bucketId + "/" + filePath;
        console.log(destinationFolder);
        cb(null, destinationFolder);
    },
    filename: function (req, file, cb) {
        const filename = req.headers.filename && typeof req.headers.filename === "string"
            ? req.headers.filename
            : file.originalname;
        cb(null, filename);
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
