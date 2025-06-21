// utils/authTokenHelper.js
import axios from "axios";
import "dotenv/config";

let idToken = null;
let refreshToken =
  "AMf-vBwo3XMI2iZGeu3T0nLBUI1VWgKXkgYPui6sNFuTktlgQvbNcm93bGsW6QRXaktVL669I4tsnkXqeiRmXsE0HHpHmmU0IADz5ZW9KEm6zkrcx2ubqWcbIbzrsYoQHD0E9y3-ayHaQJydr_I-eix0Co_msyRByN2IeNn-P-cliWiYhxgkL63FuL_qxpOMkGF5JElRsvsZPjEN-hQPan5tjYXqShfj6iJc_F8Qe5wCuHTpY2PJmOM";

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;

export function setTokens({ idToken: token, refreshToken: refresh }) {
  idToken = token;
  refreshToken = refresh;
}

export function getIdToken() {
  return idToken;
}

export async function refreshIdToken() {
  if (!refreshToken || !FIREBASE_API_KEY) {
    throw new Error("Missing refreshToken or API key");
  }

  const response = await axios.post(
    `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`,
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  idToken = response.data.id_token;
  refreshToken = response.data.refresh_token;

  console.log("✅ Refreshed Firebase ID token");
  return idToken;
}
