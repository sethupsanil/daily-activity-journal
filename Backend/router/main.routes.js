import express from "express";

import activityRouter from "../modules/activity/activity.router.js";
import authMiddleware from "../modules/auth/auth.middleware.js";
import { authenticate } from "../modules/auth/authentication.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Daily Activity Journal API is running 🚀");
});

router.post("/login", authMiddleware, authenticate);
router.use("/activity", authMiddleware, activityRouter);

export default router;
