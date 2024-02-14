import { uploadFunction, uploadFunctionData } from "./services/Lambda";

const main = async () => {
  // await getAllFiles();
  // await deleteFile(mainFiles[0]);
  // await uploadFile();
  await uploadFunctionData();
};

main();
