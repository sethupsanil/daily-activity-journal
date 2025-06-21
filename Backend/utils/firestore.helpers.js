import admin from "../config/firebaseConfig.js";

const db = admin.firestore();

/**
 * Adds a document to a Firestore collection with server timestamps.
 * @param {string} collectionName - The name of the collection.
 * @param {Object} data - The data object to save.
 * @returns {Promise<Object>} - The saved document reference and ID.
 */
export const saveToFirestore = async (collectionName, data) => {
  const ref = db.collection(collectionName);

  const doc = {
    ...data,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  const addedRef = await ref.add(doc);
  return {
    id: addedRef.id,
    ref: addedRef,
  };
};

/**
 * Gets all documents from a Firestore collection.
 * @param {string} collectionName - The name of the collection.
 * @returns {Promise<Array>} - Array of documents with timestamps converted to ISO strings.
 */
export const getFromFirestore = async (
  collectionName,
  limit = 10,
  orderBy = "createdAt",
  order = "desc",
  search = null,
  mood = null,
  tags = []
) => {
  // Ensure limit is a valid number
  const safeLimit = Math.max(1, Number(limit));

  // Normalize tags once
  const normalizedTags =
    Array.isArray(tags) && tags.length > 0
      ? tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean)
      : [];

  // Firestore query setup
  let query = db.collection(collectionName).orderBy(orderBy, order);

  // Add conditions to query
  if (search) {
    query = query.where("text", "==", search);
  }

  if (mood) {
    query = query.where("mood", "==", mood.toLowerCase().trim());
  }

  // Apply `array-contains-any` if any tags exist
  if (normalizedTags.length > 0) {
    query = query.where("tags", "array-contains-any", normalizedTags);
  }

  // Fetch data
  const snapshot = await query.limit(safeLimit).get();

  // Convert and strictly filter tags (must include ALL)
  const data = snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...convertTimestamps(doc.data()),
    }))
    .filter((doc) => {
      if (normalizedTags.length === 0) return true;
      const docTags = doc.tags?.map((t) => t.toLowerCase()) || [];
      return normalizedTags.every((t) => docTags.includes(t));
    });

  return data;
};

/**
 * Converts Firestore timestamps to ISO strings.
 * @param {Object} doc - The document object.
 * @returns {Object} - The document object with ISO strings.
 */
const convertTimestamps = (doc) => {
  const newDoc = { ...doc };

  if (newDoc.createdAt?.toDate) {
    newDoc.createdAt = newDoc.createdAt.toDate().toISOString();
  }

  if (newDoc.updatedAt?.toDate) {
    newDoc.updatedAt = newDoc.updatedAt.toDate().toISOString();
  }

  return newDoc;
};
