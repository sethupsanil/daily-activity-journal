import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Daily Activity Journal API is running 🚀");
});

router.post("/login", authMiddleware, (req, res) => {
  res.success({}, "Login successful");
});

export default router;
