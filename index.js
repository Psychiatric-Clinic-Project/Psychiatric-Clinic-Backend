import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/connection.js";
import { adminRouter, authRouter } from "./src/modules/index.router.js";
dotenv.config({ path: "./config/.env" });
const app = express();
const port = process.env.PORT || 3000;
connectDB();
app.use(express.json());

app.use(cors());
const BASE_URL= process.env.BASE_URL;

app.use(`${BASE_URL}admin`,adminRouter);

app.use(`${BASE_URL}auth`,authRouter);

app.use("*", (req, res) => {
   res.status(404).json({ message: "page is not found" });
});
app.use((err, req, res, next) => {
  if (err) {
    res
      .status(err["cause"])
      .json({ message: "catch error", error: err.message });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));