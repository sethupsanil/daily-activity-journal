import "dotenv/config";
import admin from "firebase-admin";
// import serviceAccount from "./firebaseServiceAccount.json";

import fs from 'fs';

const serviceAccount = JSON.parse(
  fs.readFileSync('./config/firebaseServiceAccount.json', 'utf8')
);

admin.initializeApp({
  // credential: admin.credential.applicationDefault(),
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://daily-activity-journal.firebaseio.com",
});

if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
  console.log("✅  Using Firebase Auth Emulator");
  process.env.GOOGLE_CLOUD_PROJECT = "daily-activity-journal";
} else {
  console.log("⚠️NOT  Using Firebase Auth Emulator");
}

export default admin;

