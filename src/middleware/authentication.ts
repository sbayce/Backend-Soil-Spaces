import * as JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction )=> {
  try {
    const token = req.headers.authorization

    if (!token?.startsWith("Bearer ")) {
      res.status(401).json("No token found, login first.");
    }else{
      const accessToken = token.split(" ")[1]
      const decoded: any = JWT.verify(accessToken, String(process.env.ACCESS_SECRET));
      const userId: string = decoded.userId;
      const role = decoded.role
      req.userId = userId;
      req.userRole = role
      return next();
    }
  } catch (error: any) {
    console.log(error)
    res.status(400).json(error.message);
  }
};

export default isAuthenticated;