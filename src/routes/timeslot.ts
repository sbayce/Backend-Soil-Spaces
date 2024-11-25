import createTimeslot from "../controllers/timeslot/create-timeslot";
import deleteTimeslot from "../controllers/timeslot/delete-timeslot";
import isAuthenticated from "../middleware/authentication";
import { authorize } from "../middleware/authorization";
import { Router } from "express";

export const timeslotRouter = Router()
/**
 * @swagger
 * paths:
 *   /timeslot/create:
 *     post:
 *       summary: Create a new timeslot (Admin Only)
 *       description: Allows an admin to create a new timeslot with a specified start and end time.
 *       tags:
 *         - Timeslot
 *       requestBody:
 *         description: Start and end times of the timeslot
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 startTime:
 *                   type: string
 *                   format: time
 *                   description: The start time of the timeslot (e.g., "08:00").
 *                 endTime:
 *                   type: string
 *                   format: time
 *                   description: The end time of the timeslot (e.g., "10:00").
 *               required:
 *                 - startTime
 *                 - endTime
 *       responses:
 *         '201':
 *           description: Timeslot successfully created
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   createdTimeslot:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: The ID of the created timeslot
 *                       startTime:
 *                         type: string
 *                         format: time
 *                         description: The start time of the timeslot
 *                       endTime:
 *                         type: string
 *                         format: time
 *                         description: The end time of the timeslot
 *                   message:
 *                     type: string
 *                     description: Success message
 *         '400':
 *           description: Invalid or missing input
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Error message
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *       security:
 *         - BearerAuth: []
 */
timeslotRouter.post('/create', isAuthenticated, authorize(["ADMIN"]), createTimeslot)
/**
 * @swagger
 * paths:
 *   /timeslot/delete:
 *     delete:
 *       summary: Delete a timeslot (Admin Only)
 *       description: Allows an admin to delete a specific timeslot by its ID.
 *       tags:
 *         - Timeslot
 *       parameters:
 *         - in: query
 *           name: timeslotId
 *           required: true
 *           description: The ID of the timeslot to delete
 *           schema:
 *             type: number
 *       responses:
 *         '200':
 *           description: Timeslot deleted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   deletedTimeslot:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: The ID of the deleted timeslot
 *                       startTime:
 *                         type: string
 *                         format: time
 *                         description: The start time of the timeslot
 *                       endTime:
 *                         type: string
 *                         format: time
 *                         description: The end time of the timeslot
 *                   message:
 *                     type: string
 *                     description: Success message
 *         '404':
 *           description: Timeslot not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Error message
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *       security:
 *         - BearerAuth: []
 */
timeslotRouter.delete('/delete', isAuthenticated, authorize(["ADMIN"]), deleteTimeslot)