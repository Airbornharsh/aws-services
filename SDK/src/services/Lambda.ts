class Harsh_Lambda {
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

  async uploadFile(file: File) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const data = await fetch("http://localhost:4001/api/upload-lambda", {
        method: "PUT",
        body: formData,
      });
      const parsedData: {
        lambda: string;
        message: string;
      } = await data.json();
      return parsedData;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export { Harsh_Lambda };
