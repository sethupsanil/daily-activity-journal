import {
  getFromFirestore,
  saveToFirestore,
} from "../../utils/firestore.helpers.js";
import { getTagsAndMoodFromAI } from "../../utils/openAI.helper.js";

export const saveActivityLog = async (userId, email, text) => {
  const activityData = {
    userId,
    email,
    text,
  };
  const tagsAndMood = await getTagsAndMoodFromAI(text);
  const added = await saveToFirestore("activities", {
    ...activityData,
    ...tagsAndMood,
  });
  return { id: added.id };
};

export const getActivitiesFromFirestore = async (
  limit,
  orderBy,
  order,
  search,
  mood,
  tags
) => {
  const activities = await getFromFirestore(
    "activities",
    limit,
    orderBy,
    order,
    search,
    mood,
    tags
  );
  return activities;
};
