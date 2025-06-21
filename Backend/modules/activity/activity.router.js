import express from "express";
import { validateRequest } from "../../middleware/validator.middleware.js";
import { getActivities, logActivity } from "./activity.controller.js";
import { logActivitySchema } from "./activity.validator.js";

const activityRouter = express.Router();

activityRouter.post(
  "/log-activity",
  validateRequest(logActivitySchema),
  logActivity
);
activityRouter.get("/get-activities", getActivities);
export default activityRouter;
