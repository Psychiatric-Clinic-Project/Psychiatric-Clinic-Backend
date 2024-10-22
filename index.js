import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });
const app = express();
const port = 3000;
app.use(express.json());



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