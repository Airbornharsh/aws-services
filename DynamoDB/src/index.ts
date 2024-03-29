import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import path from "path";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 4003;

app.use("/api", routes);

app.listen(port, () => {
  console.log("Connected to DynamoDB Port at ", port);
});
