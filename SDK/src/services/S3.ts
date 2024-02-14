import { FileType } from "../types/FileType";
class Harsh_S3 {
  private key: string;
  private secret: string;
  constructor(key: string, secret: string) {
    if (!key || !secret) {
      throw new Error("Please provide key and secret");
    }
    if (key !== "harsh" && secret !== "harsh") {
      throw new Error("Invalid key or secret");
    }
    this.key = key;
    this.secret = secret;
  }

  async createBucket() {
    try {
      const data = await fetch("http://localhost:4001/api/create-bucket", {
        method: "POST",
      });
      const parsedData = await data.json();
      return parsedData;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async uploadFile(
    file: File,
    bucketId: string,
    path: string,
    filename: string
  ) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("path", path);
      formData.append("filename", filename);

      const data = await fetch(
        `http://localhost:4001/api/add-files/${bucketId}?path=${path}&filename=${filename}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      const parsedData = await data.json();
      const uploadedFile: FileType = {
        name: parsedData.file.name,
        path: parsedData.file.path,
        url: parsedData.file.url,
      };
      return uploadedFile;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async uploadFuction(file: File) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", file.name);

      const data = await fetch(`http://localhost:4001/api/upload-lambda`, {
        method: "PUT",
        body: formData,
      });
      const parsedData = await data.json();
      console.log(parsedData);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async getFileUrl(bucketId: string, path: string) {
    try {
      const data = await fetch(
        `http://localhost:4001/api/url/${bucketId}?path=${path}`
      );
      const parsedData = await data.json();
      return parsedData;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async getAllFiles(bucketId: string) {
    try {
      const data = await fetch(
        `http://localhost:4001/api/get-files/${bucketId}`
      );
      const parsedData = await data.json();
      const files: FileType[] = parsedData.files.map(
        (file: { name: string; path: string; url: string }) => {
          const tempFile: FileType = {
            name: file.name,
            path: file.path,
            url: file.url,
          };
          return tempFile;
        }
      );
      if (!files) {
        return [] as FileType[];
      }
      if (files.length > 0) {
        return files;
      } else {
        return [] as FileType[];
      }
    } catch (e: any) {
      throw new Error(e);
    }
  }

  //   async downloadFile(bucketId: string, path: string) {
  //     try {
  //       const data = await fetch(
  //         `http://localhost:4001/api/download-file/${bucketId}?path=${path}`
  //       );
  //       console.log(await data.blob());
  //       // const parsedData = await data.json();
  //       // return parsedData;
  //     } catch (e: any) {
  //       console.error(e);
  //     }
  //   }

  async deleteFile(bucketId: string, file: FileType | string) {
    try {
      let data;
      if (typeof file === "string") {
        data = await fetch(
          `http://localhost:4001/api/delete-file/${bucketId}?path=${file}`,
          {
            method: "DELETE",
          }
        );
      } else {
        data = await fetch(
          `http://localhost:4001/api/delete-file/${bucketId}?path=${file.path}`,
          {
            method: "DELETE",
          }
        );
      }
      const parsedData = await data.json();
      return parsedData;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export { Harsh_S3 };
