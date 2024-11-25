import { Router } from "express";
import register from "../controllers/auth/register";
import login from "../controllers/auth/login";

/**
 * @swagger
 * tags:
 *   name: Authentication
 */

export const authRouter = Router()
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registers a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *               role:
 *                 type: string
 *                 enum: [ADMIN, MEMBER]
 *                 description: User's role
 *     responses:
 *       200:
 *         description: Registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: Access token for the user
 *                     refreshToken:
 *                       type: string
 *                       description: Refresh token for the user
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request, e.g., user already exists
 *       500:
 *         description: Internal server error
 */
authRouter.post('/register', register)
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs in an existing user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: Access token for the user
 *                     refreshToken:
 *                       type: string
 *                       description: Refresh token for the user
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
authRouter.post('/login', login)