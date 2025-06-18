import "dotenv/config";
import admin from "firebase-admin";

admin.initializeApp({
  //   credential: admin.credential.applicationDefault(),
});

if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
  console.log("✅  Using Firebase Auth Emulator");
  process.env.GOOGLE_CLOUD_PROJECT = "daily-activity-journal";
} else {
  console.log("⚠️NOT  Using Firebase Auth Emulator");
}

export default admin;
