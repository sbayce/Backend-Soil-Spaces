import jwt from "jsonwebtoken";
import { UserRole } from "@prisma/client";
import { AuthToken, AuthTokenType } from "../types/auth-token";

const createToken = (userId: string, role: UserRole): AuthToken => {
    const accessToken = jwt.sign({userId, role}, String(process.env.ACCESS_SECRET), {expiresIn: process.env.ACCESS_EXPIRATION})
    const refreshToken = jwt.sign({userId, role}, String(process.env.REFRESH_SECRET), {expiresIn: process.env.REFRESH_EXPIRATION})
        return {
            accessToken,
            refreshToken,
            expiresIn: String(process.env.ACCESS_EXPIRATION),
            tokenType: AuthTokenType.BEARER
        }
}

export default createToken