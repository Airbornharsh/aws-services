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
      console.log(parsedData);
    } catch (e: any) {
      console.error(e);
    }
  }
}

export { Harsh_S3 };
