import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import responseHandler from "./middleware/responseHandler.js";
import router from "./router/main.routes.js";
import { refreshIdToken } from "./utils/authTokenHelper.util.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(responseHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// Root route
app.get("/", (req, res) => {
  res.send("Daily Activity Journal API is running 🚀");
});

// API routes
app.use("/api", router);

app.get("/refresh", async (req, res) => {
  const token = await refreshIdToken();
  res.send(token);
});
