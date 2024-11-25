import { Router } from "express";
import createSpace from "../controllers/space/create-space";
import { authorize } from "../middleware/authorization";
import getSpaces from "../controllers/space/get-spaces";
import isAuthenticated from "../middleware/authentication";
import updateSpace from "../controllers/space/update-space";
import deleteSpace from "../controllers/space/delete-space";
import { limiter } from "../rate-limitter";

/**
 * @swagger
 * tags:
 *   name: Space
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

export const spaceRouter = Router()
/**
 * @swagger
 * /space/create:
 *   post:
 *     summary: Creates a new space (Admin Only)
 *     tags: [Space]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [MEETING, CONFERENCE, WORKSPACE]  # Example of SpaceType
 *               capacity:
 *                 type: integer
 *               pricePerHour:
 *                 type: number
 *               availability:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Space created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 createdSpace:
 *                   type: object
 *                   description: The created space object
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Invalid request or invalid space type
 *       401:
 *         description: Unauthorized, login required
 *       403:
 *         description: Forbidden, only Admin roles are allowed
 *       500:
 *         description: Internal server error
 */
spaceRouter.post('/create', isAuthenticated, authorize(["ADMIN"]), createSpace)
/**
 * @swagger
 * /space/update/{spaceId}:
 *   patch:
 *     summary: Updates an existing space by ID (Admin Only)
 *     tags: [Space]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: spaceId
 *         in: path
 *         required: true
 *         description: ID of the space to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [MEETING_ROOM, PRIVATE_OFFICE, HOT_DESK]
 *               capacity:
 *                 type: integer
 *               pricePerHour:
 *                 type: number
 *               availability:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Space updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updatedSpace:
 *                   type: object
 *                   description: The updated space object
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Invalid space type or no property to update
 *       401:
 *         description: Unauthorized, login required
 *       403:
 *         description: Forbidden, only Admin roles are allowed
 *       404:
 *         description: Space not found
 *       500:
 *         description: Internal server error
 */
spaceRouter.patch('/update/:spaceId', isAuthenticated, authorize(["ADMIN"]), updateSpace)
/**
 * @swagger
 * /space/delete/{spaceId}:
 *   delete:
 *     summary: Deletes a space by ID (Admin Only)
 *     tags: [Space]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: spaceId
 *         in: path
 *         required: true
 *         description: ID of the space to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Space deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedSpace:
 *                   type: object
 *                   description: The deleted space object
 *                 message:
 *                   type: string
 *                   description: Success message
 *       401:
 *         description: Unauthorized, login required
 *       403:
 *         description: Forbidden, only Admin roles are allowed
 *       404:
 *         description: Space not found
 *       500:
 *         description: Internal server error
 */
spaceRouter.delete('/delete/:spaceId', isAuthenticated, authorize(["ADMIN"]), deleteSpace)
/**
 * @swagger
 * /space:
 *   get:
 *     summary: Retrieves a list of spaces with optional filters (Includes Rate Limitting)
 *     tags: [Space]
 *     parameters:
 *       - name: type
 *         in: query
 *         description: Filter spaces by type (e.g., MEETING_ROOM, PRIVATE_OFFICE, HOT_DESK)
 *         schema:
 *           type: string
 *       - name: minCapacity
 *         in: query
 *         description: Minimum capacity
 *         schema:
 *           type: integer
 *       - name: maxCapacity
 *         in: query
 *         description: Maximum capacity
 *         schema:
 *           type: integer
 *       - name: minPrice
 *         in: query
 *         description: Minimum price per hour
 *         schema:
 *           type: number
 *           format: float
 *       - name: maxPrice
 *         in: query
 *         description: Maximum price per hour
 *         schema:
 *           type: number
 *           format: float
 *     responses:
 *       200:
 *         description: Spaces successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 spaces:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: The space objects
 *                 message:
 *                   type: string
 *                   description: Success message
 *       500:
 *         description: Internal server error
 */
spaceRouter.get('/', limiter, getSpaces)