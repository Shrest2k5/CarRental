import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "not authorized, no token"
      });
    }

    // support both "Bearer token" and raw token
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 FIX: handle both string and object payloads
    const userId = typeof decoded === "string" ? decoded : decoded.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "not authorized, user not found"
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("AUTH ERROR:", error.message);
    return res.status(401).json({
      success: false,
      message: "not authorized, token failed"
    });
  }
};
