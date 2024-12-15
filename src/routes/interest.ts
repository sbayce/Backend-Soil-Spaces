import { Router } from "express";
import isAuthenticated from "../middleware/authentication";
import { authorize } from "../middleware/authorization";
import createInterest from "../controllers/interest/create-interest";

export const interestRouter = Router()

// interestRouter.post("/create", isAuthenticated, authorize(["ADMIN"]), createInterest)
interestRouter.post("/create", createInterest)