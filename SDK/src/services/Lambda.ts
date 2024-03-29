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
      const data = await fetch(`${process.env.S3_URI}/api/upload-lambda`, {
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

  async uploadData(fileData: string) {
    try {
      const data = await fetch(`${process.env.S3_URI}/api/upload-lambda-data`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileData }),
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

  async executeLambda(lambda: string) {
    try {
      const data = await fetch(
        `${process.env.LAMBDA_URI}/api/execute-lambda?lambda=${lambda}`,
        {
          method: "POST",
          body: "",
        }
      );
      const parsedData: {
        message: string;
        output: string;
      } = await data.json();
      return parsedData;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export { Harsh_Lambda };
