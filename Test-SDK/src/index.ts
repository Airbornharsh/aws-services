import { createTable, deleteItem, getItem, getItems, putItem, queryItems, updateItem } from "./services/DynamoDB";
import {
  executeLambda,
} from "./services/Lambda";

const main = async () => {
  // await getAllFiles();
  // await deleteFile(mainFiles[0]);
  // await uploadFile();
  
  await deleteItem();
};

main();
