import "dotenv/config";
import express from "express";
import dbConnection from "./src/db/DB.js";
import cors from "cors";
import allRoutes from "./src/routes/allRoutes.js";
import { errorHandler, notFound } from "./src/middlewares/errorHandling.js";
import morgan from "morgan";
import cookirParser from "cookie-parser";
const app = express();
app.use(express.static("uploads"));
app.use(express.json());
app.use(cookirParser());
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
dbConnection();
app.use(allRoutes);

app.get("/test", (req, res) => {
  res.send("hello world");
});
app.use("*", notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`listening on port port ${port}`);
});
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Shutting Down........");
    process.exit(1);
  });
});
