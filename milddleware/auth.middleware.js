import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/env.js"
export const authorize = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, JWT_SECRET)
    console.log('hey am here')
    const user = await User.findById(decoded.userId).select("-password")
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" })
  }
}
