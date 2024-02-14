import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import path from "path";

dotenv.config();
const app = express();
app.use(
  "/buckets/lambda",
  express.static(path.join(__dirname, "/../", "buckets/lambda"))
);
const port = process.env.PORT || 3000;

app.use("/api", routes);

app.listen(port, () => {
  console.log("Connected to S3 Port at ", port);
});
