import { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";

export const authorize = (roles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.userRole || !Object.values(roles).includes(req.userRole)) {
        res.status(403).json({ error: `Role ${req.userRole} was denied access. Only roles ${roles.join(", ")} have access.` });
        return
    }
    return next();
};