import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_KEY || "supersecretkey";

export const protect = (req, res, next) => {

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = { id: decoded.id }; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};
