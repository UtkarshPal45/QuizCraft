import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const authenticateUser = async (req, res, next) => {
  const token =req.cookies.token
  if (!token) return res.status(401).json({ message: 'No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECURITY_KEY); // Decode token
    const user = await User.findById(decoded.id); // Fetch user from DB

    if (!user) return res.status(404).json({ message: 'User not found.' });

    req.user = user //attach complete user object to req
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

export default authenticateUser

