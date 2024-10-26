import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Database/connection.js";
import { adminRouter, authRouter } from "./src/modules/index.router.js";
import { customResponse } from "./src/middleWare/customResponse.js";
import { notFoundMessage } from "./src/utils/index.js";

dotenv.config({ path: "./config/.env" });

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(cors());
app.use(customResponse);

const BASE_URL= process.env.BASE_URL;
app.use(`${BASE_URL}admin`,adminRouter);
app.use(`${BASE_URL}auth`,authRouter);

app.use("*", (req, res) => {
   res.error(notFoundMessage("Page"), 404);
});

app.use((err, req, res, next) => {
   res.error(err.message, err.status || 500);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));