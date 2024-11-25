import { Router } from "express";
import bookSpace from "../controllers/booking/book-space";
import isAuthenticated from "../middleware/authentication";
import { authorize } from "../middleware/authorization";
import getBooking from "../controllers/booking/get-booking";
import getBookings from "../controllers/booking/get-bookings";
import updateBooking from "../controllers/booking/update-booking";
import { limiter } from "../rate-limitter";

export const bookingRouter = Router()

/**
 * @swagger
 * paths:
 *   /booking/book/{spaceId}:
 *     post:
 *       summary: Book a space for a specific time slot (Includes Rate Limitting)
 *       description: Allows a user to book a space for a specified time slot and date. Requires user authentication.
 *       tags:
 *         - Booking
 *       parameters:
 *         - in: path
 *           name: spaceId
 *           required: true
 *           description: The ID of the space to be booked
 *           schema:
 *             type: string
 *       requestBody:
 *         description: The details required to book the space (time slot and date)
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 timeSlotId:
 *                   type: string
 *                   description: The ID of the time slot being booked
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: The date for the booking
 *               required:
 *                 - timeSlotId
 *                 - date
 *       responses:
 *         '201':
 *           description: Space booked successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   booking:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The ID of the newly created booking
 *                       userId:
 *                         type: string
 *                         description: The ID of the user who made the booking
 *                       spaceId:
 *                         type: string
 *                         description: The ID of the booked space
 *                       timeSlotId:
 *                         type: string
 *                         description: The ID of the booked time slot
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: The booking date
 *                   message:
 *                     type: string
 *                     description: Success message
 *         '400':
 *           description: Missing required fields (timeSlotId, date)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *         '404':
 *           description: Space or user not found, or time slot does not exist
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *         '409':
 *           description: Time slot already booked for the selected date
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
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

bookingRouter.post('/book/:spaceId', limiter, isAuthenticated, bookSpace)
/**
 * @swagger
 * paths:
 *   /booking/{bookingId}:
 *     get:
 *       summary: Get details of a specific booking (Includes Rate Limitting)
 *       description: Retrieves the details of a specific booking by its ID, belonging to the authenticated user.
 *       tags:
 *         - Booking
 *       parameters:
 *         - in: path
 *           name: bookingId
 *           required: true
 *           description: The ID of the booking to retrieve
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Booking details successfully retrieved
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   booking:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The ID of the booking
 *                       userId:
 *                         type: string
 *                         description: The ID of the user who made the booking
 *                       spaceId:
 *                         type: string
 *                         description: The ID of the booked space
 *                       timeSlotId:
 *                         type: string
 *                         description: The ID of the booked time slot
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: The booking date
 *                   message:
 *                     type: string
 *                     description: Success message
 *         '404':
 *           description: Booking does not exist for this user
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
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
bookingRouter.get('/:bookingId', limiter, isAuthenticated, getBooking)
/**
 * @swagger
 * paths:
 *   /booking:
 *     get:
 *       summary: Retrieve all bookings (Admin Only)
 *       description: Fetches all bookings from the database. Accessible by Admins only.
 *       tags:
 *         - Booking
 *       responses:
 *         '200':
 *           description: A list of all bookings successfully retrieved
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   bookings:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: The ID of the booking
 *                         userId:
 *                           type: string
 *                           description: The ID of the user who made the booking
 *                         spaceId:
 *                           type: string
 *                           description: The ID of the booked space
 *                         timeSlotId:
 *                           type: string
 *                           description: The ID of the booked time slot
 *                         date:
 *                           type: string
 *                           format: date-time
 *                           description: The booking date
 *                   message:
 *                     type: string
 *                     description: Success message
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
bookingRouter.get('/', isAuthenticated, authorize(["ADMIN"]), getBookings)
/**
 * @swagger
 * paths:
 *   /booking/update/{bookingId}:
 *     patch:
 *       summary: Update a booking's status (Admin Only)
 *       description: Allows an admin user to update the status of a booking by its ID. The status must be one of the valid values.
 *       tags:
 *         - Booking
 *       parameters:
 *         - in: path
 *           name: bookingId
 *           required: true
 *           description: The ID of the booking to update
 *           schema:
 *             type: string
 *       requestBody:
 *         description: The status of the booking to be updated
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [PENDING, CONFIRMED, COMPLETED, CANCELLED]
 *                   description: The new status of the booking
 *               required:
 *                 - status
 *       responses:
 *         '200':
 *           description: Booking status successfully updated
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   updatedBooking:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The ID of the updated booking
 *                       status:
 *                         type: string
 *                         description: The updated status of the booking
 *                       userId:
 *                         type: string
 *                         description: The ID of the user who made the booking
 *                       spaceId:
 *                         type: string
 *                         description: The ID of the booked space
 *                       timeSlotId:
 *                         type: string
 *                         description: The ID of the booked time slot
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: The booking date
 *                   message:
 *                     type: string
 *                     description: Success message
 *         '400':
 *           description: Invalid or missing status
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *         '404':
 *           description: Booking not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
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
bookingRouter.patch('/update/:bookingId', isAuthenticated, authorize(["ADMIN"]), updateBooking)