import {
  getActivitiesFromFirestore,
  saveActivityLog,
} from "./activity.service.js";

/**
 * Logs an activity to the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the activity is logged.
 */
export const logActivity = async (req, res) => {
  const { userId, email, email_verified } = req.user;
  const { text } = req.body;
  const activity = await saveActivityLog(userId, email, text);

  res.success({ ...activity }, "Activity logged successfully", 201);
};

/**
 * Gets all activities from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the activities are fetched.
 */
export const getActivities = async (req, res) => {
  const {
    limit = 10,
    orderBy = "createdAt",
    order = "desc",
    search = null,
    mood = null,
  } = req.query;
  let { tags } = req.query;
  if (typeof tags === "string") {
    try {
      tags = JSON.parse(tags);
    } catch (e) {
      tags = [];
    }
  }

  const activities = await getActivitiesFromFirestore(
    limit,
    orderBy,
    order,
    search,
    mood,
    tags
  );
  res.success(activities, "Activities fetched successfully");
};
