import admin from "../config/firebaseConfig.js";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.error({ message: "No token provided" }, 401);

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.error(error, 401);
  }
};

export default authMiddleware;
