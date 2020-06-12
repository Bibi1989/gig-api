import { NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticate = (req: any, res: any, next: NextFunction) => {
  try {
    const token = req.headers["auth"];
    if (!token) {
      throw Error("unauthorize user, access denied");
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("token not found");
    res.status(404).json({ error: error.message });
  }
};

export default authenticate;
